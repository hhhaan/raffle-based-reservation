'use client';

import { useMemo } from 'react';

import { RAFFLE_STATUS, RaffleStatusType } from '../constants/status';

import { useParticipationStatus } from './use-participation-status';
import { useRaffles } from './use-raffles';

export const useRafflesWithParticipation = (
    status: RaffleStatusType = RAFFLE_STATUS.ALL,
    userId?: string
) => {
    // 기존 훅들 조합
    const rafflesQuery = useRaffles(status);
    const participationQuery = useParticipationStatus(userId);

    // 참여 상태 맵 메모이제이션
    const participationMap = useMemo(() => {
        return new Set(participationQuery.data?.filter(Boolean) ?? []);
    }, [participationQuery.data]);

    // 래플 + 참여 상태 데이터 메모이제이션
    const rafflesWithParticipation = useMemo(() => {
        return rafflesQuery.data.map(raffle => ({
            ...raffle,
            isParticipated: participationMap.has(raffle.id),
        }));
    }, [rafflesQuery.data, participationMap]);

    // 래플 데이터는 항상 필요, 참여 상태는 로그인시만 필요
    const isLoading = rafflesQuery.isLoading || (userId ? participationQuery.isLoading : false);

    return {
        data: rafflesWithParticipation,
        isLoading: isLoading,
        error: rafflesQuery.error || participationQuery.error,
        fetchNextPage: rafflesQuery.fetchNextPage,
        hasNextPage: rafflesQuery.hasNextPage,
        isFetchingNextPage: rafflesQuery.isFetchingNextPage,
    };
};
