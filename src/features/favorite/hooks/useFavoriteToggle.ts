'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { axiosClient } from '@/src/shared/utils';

// 타입 정의
interface FavoriteParams {
    userId: string;
    restaurantId: number;
}

interface ToggleFavoriteParams extends FavoriteParams {
    isFavorite: boolean;
}

// 쿼리 키 상수화
const QUERY_KEYS = {
    favoriteIds: (userId: string) => ['favoriteIds', userId],
    favoriteRestaurants: (userId: string) => ['favoriteRestaurants', userId],
};

// API 호출 함수들
const favoriteApi = {
    add: async ({ userId, restaurantId }: FavoriteParams) => {
        const response = await axiosClient.post('/favorites', {
            user_id: userId,
            restaurant_id: restaurantId,
        });
        return response.data;
    },

    remove: async ({ userId, restaurantId }: FavoriteParams) => {
        const response = await axiosClient.delete('/favorites', {
            params: {
                user_id: `eq.${userId}`,
                restaurant_id: `eq.${restaurantId}`,
            },
        });
        return response.data;
    },
};

export const useFavoriteToggle = () => {
    const queryClient = useQueryClient();
    const [processingIdsSet, setProcessingIdsSet] = useState<Set<number>>(new Set());
    const [error, setError] = useState<Error | null>(null);

    // 프로세싱 ID 관리 함수
    const addProcessingId = useCallback((id: number) => {
        setProcessingIdsSet((prev) => new Set(prev).add(id));
    }, []);

    const removeProcessingId = useCallback((id: number) => {
        setProcessingIdsSet((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    }, []);

    // 낙관적 업데이트 공통 함수 - 타입 안전성 강화
    const performOptimisticUpdate = async (
        userId: string,
        restaurantId: number,
        updateFn: (old: number[]) => number[]
    ) => {
        await queryClient.cancelQueries({ queryKey: QUERY_KEYS.favoriteIds(userId) });
        const previousFavoriteIds = queryClient.getQueryData(QUERY_KEYS.favoriteIds(userId)) || [];

        // 여기서 타입 안전하게 처리 - old가 배열인지 확인 후 처리
        queryClient.setQueryData(QUERY_KEYS.favoriteIds(userId), (old: any) => {
            // 배열이 아니면 빈 배열로 처리
            if (!Array.isArray(old)) {
                return updateFn([]);
            }
            return updateFn(old);
        });

        return { previousFavoriteIds };
    };

    // 쿼리 무효화 공통 함수
    const invalidateRelatedQueries = useCallback(
        (userId: string) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.favoriteIds(userId) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.favoriteRestaurants(userId) });
        },
        [queryClient]
    );

    // 호출 전에 에러 초기화
    const resetError = useCallback(() => {
        setError(null);
    }, []);

    // React Query v5 변경사항 적용
    const addFavorite = useMutation({
        mutationFn: favoriteApi.add,
        onMutate: async ({ userId, restaurantId }) => {
            resetError();
            return performOptimisticUpdate(userId, restaurantId, (old: number[]) =>
                old.includes(restaurantId) ? old : [...old, restaurantId]
            );
        },
        onError: (error, { userId }, context) => {
            console.error('즐겨찾기 추가 중 오류 발생:', error);
            setError(error as Error);
            // 오류 발생 시 이전 상태로 롤백
            if (context?.previousFavoriteIds) {
                queryClient.setQueryData(QUERY_KEYS.favoriteIds(userId), context.previousFavoriteIds);
            }
        },
        onSettled: (_, __, { userId }) => {
            invalidateRelatedQueries(userId);
        },
    });

    const removeFavorite = useMutation({
        mutationFn: favoriteApi.remove,
        onMutate: async ({ userId, restaurantId }) => {
            resetError();
            return performOptimisticUpdate(userId, restaurantId, (old: number[]) =>
                old.filter((id) => id !== restaurantId)
            );
        },
        onError: (error, { userId }, context) => {
            console.error('즐겨찾기 제거 중 오류 발생:', error);
            setError(error as Error);
            if (context?.previousFavoriteIds) {
                queryClient.setQueryData(QUERY_KEYS.favoriteIds(userId), context.previousFavoriteIds);
            }
        },
        onSettled: (_, __, { userId }) => {
            invalidateRelatedQueries(userId);
        },
    });

    // toggleFavorite 함수 최적화
    const toggleFavorite = useCallback(
        async ({ userId, restaurantId, isFavorite }: ToggleFavoriteParams) => {
            // 이미 처리 중인 항목은 중복 처리 방지
            if (processingIdsSet.has(restaurantId)) return;

            addProcessingId(restaurantId);

            try {
                const mutationFn = isFavorite ? removeFavorite : addFavorite;
                await mutationFn.mutateAsync({ userId, restaurantId });
            } catch (error) {
                console.error('즐겨찾기 토글 중 오류 발생:', error);
                setError(error as Error);
            } finally {
                removeProcessingId(restaurantId);
            }
        },
        [processingIdsSet, addProcessingId, removeProcessingId, removeFavorite, addFavorite]
    );

    // isProcessing 함수 메모이제이션
    const isProcessing = useCallback((restaurantId: number) => processingIdsSet.has(restaurantId), [processingIdsSet]);

    // 간결한 객체 반환
    return {
        isProcessing,
        toggleFavorite,
        addFavorite: addFavorite.mutate,
        removeFavorite: removeFavorite.mutate,
        isAddingFavorite: addFavorite.isPending,
        isRemovingFavorite: removeFavorite.isPending,
        error,
        resetError,
    };
};
