'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getRaffles } from '../api/raffle';
import { RAFFLE_STATUS, RaffleStatusType } from '../constants/status';

export const useRaffles = (status: RaffleStatusType = RAFFLE_STATUS.ALL) => {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['raffles', status],
            queryFn: ({ pageParam = 0 }) => getRaffles(pageParam, status),
            getNextPageParam: (lastPage, allPages) => {
                // 마지막 페이지에서 받은 데이터가 10개 미만이면 더 이상 페이지가 없음
                if (!lastPage || lastPage.length < 10) return undefined;
                return allPages.length * 10; // 다음 페이지의 시작 인덱스
            },
            staleTime: 5 * 60 * 1000,
            initialPageParam: 0,
        });

    const allRaffles = data?.pages.flat() ?? [];

    return {
        data: allRaffles,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};
