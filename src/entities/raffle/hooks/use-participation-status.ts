'use client';

import { useQuery } from '@tanstack/react-query';
import { getParticipationStatus } from '../api/raffle';

export const useParticipationStatus = (userId?: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['participation-status', userId],
        queryFn: () => getParticipationStatus(userId!),
        enabled: !!userId,
        placeholderData: [],
        staleTime: 5 * 60 * 1000,
    });

    return { data, isLoading, error };
};
