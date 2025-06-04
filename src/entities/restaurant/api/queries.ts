'use client';

import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from './restaurant';

export const useRestaurants = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => getRestaurants(),
        staleTime: 5 * 60 * 1000,
    });
    return {
        data,
        isLoading,
        error,
    };
};
