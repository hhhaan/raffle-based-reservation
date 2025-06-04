'use client';

import { useQuery } from '@tanstack/react-query';
import { getRestaurantDetail } from '../api/restaurant-detail';

export const useRestaurantDetail = (id: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['restaurantDetail', id],
        queryFn: () => getRestaurantDetail(id),
    });
    return {
        data,
        isLoading,
        error,
    };
};
