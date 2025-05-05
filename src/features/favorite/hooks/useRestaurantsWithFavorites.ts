import { useMemo } from 'react';
import { useAllRestaurants } from './useAllRestaurants';
import { useFavoriteIds } from './useFavoriteIds';

export const useRestaurantsWithFavorites = (userId: string) => {
    const { data: restaurants } = useAllRestaurants();
    const { data: favoriteIds = [] } = useFavoriteIds(userId);

    return useMemo(() => {
        if (!restaurants) return [];

        return restaurants.map((restaurant: any) => ({
            ...restaurant,
            isFavorite: favoriteIds.includes(restaurant.id),
        }));
    }, [restaurants, favoriteIds]);
};
