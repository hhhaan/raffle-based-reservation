'use client';

import { useUserStore } from '@/src/entities/user/model/store';
import { createClient } from '@/src/shared/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '@/src/features/favorite/api';

interface FavoriteRestaurantResponse {
    id: number;
    name: string;
    address: string;
    description: string;
    cuisine_type: string;
    max_capacity: number;
    closing_hours: string;
    opening_hours: string;
    restaurant_image: Array<{
        image_url: string;
    }>;
}

const getFavoriteRestaurants = async (userId: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('favorites')
        .select(
            `
           restaurant (
               *,
               restaurant_image(image_url)
           )
       `
        )
        .eq('user_id', userId)
        .order('restaurant(name)');

    if (error) throw error;

    return (
        data?.map(({ restaurant }) => ({
            ...(restaurant as FavoriteRestaurantResponse),
            isFavorite: true,
        })) || []
    );
};

export const useFavoriteRestaurants = () => {
    const userId = useUserStore((state) => state.user?.id);
    const { data: favorites } = useFavorites();

    const { data, isLoading } = useQuery({
        queryKey: ['favorites', 'restaurants', userId],
        queryFn: () => getFavoriteRestaurants(userId!),
        enabled: !!userId && favorites?.length > 0,
    });

    return {
        data: data || [],
        isLoading,
    };
};
