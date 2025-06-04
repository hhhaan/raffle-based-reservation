'use client';

import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/src/entities/user/model/store';
import { getUserFavorites } from './api';

export const useFavorites = () => {
    const userId = useUserStore((state) => state.user?.id);

    const { data = [], isLoading } = useQuery({
        queryKey: ['favorites', userId],
        queryFn: () => getUserFavorites(userId!),
        enabled: !!userId,
    });

    // 로그인 안 된 경우 빈 배열 반환
    return {
        data: userId ? data : [],
        isLoading: userId ? isLoading : false,
    };
};
