'use client';

import { createClient } from '@/src/shared/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

interface ToggleFavoriteParams {
    userId: string;
    restaurantId: number;
    isFavorite: boolean;
}
// toggle favorite는 원칙적으로는 /api 소속이지만, 해당 훅에서만 사용될 가능성이 높기 때문에 일단 여기 두겠음
const toggleFavorite = async ({ userId, restaurantId, isFavorite }: ToggleFavoriteParams) => {
    const supabase = createClient();
    if (isFavorite) {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', userId)
            .eq('restaurant_id', restaurantId);
        if (error) throw error;
    } else {
        const { error } = await supabase.from('favorites').insert({ user_id: userId, restaurant_id: restaurantId });
        if (error) throw error;
    }
};

export const useFavoriteToggle = () => {
    const queryClient = useQueryClient();
    const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());

    const addProcessingId = useCallback((id: number) => {
        setProcessingIds((prev) => new Set([...prev, id]));
    }, []);

    const removeProcessingId = useCallback((id: number) => {
        setProcessingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    }, []);

    const mutation = useMutation({
        mutationFn: toggleFavorite,
        onMutate: async ({ userId, restaurantId, isFavorite }) => {
            addProcessingId(restaurantId);

            // 진행 중 쿼리 취소
            await queryClient.cancelQueries({ queryKey: ['favorites', userId] });

            // 이전 상태 백업
            const previousFavorites = queryClient.getQueryData(['favorites', userId]);

            // 낙관적 업데이트
            queryClient.setQueryData(['favorites', userId], (old: number[] = []) => {
                if (isFavorite) {
                    return old.filter((id) => id !== restaurantId);
                } else {
                    return [...old, restaurantId];
                }
            });

            return { previousFavorites };
        },
        onSettled: (_, __, variables) => {
            removeProcessingId(variables.restaurantId);
            // 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            // queryClient.invalidateQueries({ queryKey: ['restaurants'] });
        },

        onError: (error, variables, context) => {
            console.error('Failed to toggle favorite:', error);
            // 이전 상태로 롤백
            if (context?.previousFavorites) {
                queryClient.setQueryData(['favorites', variables.userId], context.previousFavorites);
                console.log('rolled back');
            }
        },
    });

    return {
        toggleFavorite: mutation.mutate,
        isProcessing: (restaurantId: number) => processingIds.has(restaurantId),
        isLoading: mutation.isPending,
        error: mutation.error,
    };
};
