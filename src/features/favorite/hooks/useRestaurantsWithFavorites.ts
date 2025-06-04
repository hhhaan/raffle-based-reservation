'use client';

import { useFavorites } from '@/src/features/favorite/api';
import { useRestaurants } from '@/src/entities/restaurant/api';
import { useUserStore } from '@/src/entities/user/model/store';

export const useRestaurantsWithFavorites = () => {
    const userId = useUserStore((state) => state.user?.id);
    const { data: favorites = [], isLoading: favoritesLoading } = useFavorites(); // 내부에서 userId 처리
    const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants();

    // 즐겨찾기 상태 조합
    const restaurantsWithFavorites = restaurants?.map((restaurant) => ({
        ...restaurant,
        isFavorite: userId ? favorites.includes(restaurant.id) : false, // 비로그인시 false
    }));

    return {
        data: restaurantsWithFavorites,
        isLoading: favoritesLoading || restaurantsLoading,
    };
};
