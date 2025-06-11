'use client';

import { RestaurantCard } from '@/src/entities/restaurant/ui/restaurant-card';
import { useUserStore } from '@/src/entities/user/model/store';
import { useFavoriteToggle } from '@/src/features/favorite/hooks';

interface RestaurantListProps {
    restaurants: Restaurant[];
    isProcessing: (restaurantId: number) => boolean;
}

export const RestaurantList = ({ restaurants, isProcessing }: RestaurantListProps) => {
    const userId = useUserStore(state => state.user?.id);
    const { toggleFavorite } = useFavoriteToggle();

    if (!userId) return null;

    return (
        <div className="grid grid-cols-1 gap-4">
            {restaurants.map(restaurant => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    userId={userId}
                    onFavoriteToggle={toggleFavorite}
                    isProcessing={isProcessing(restaurant.id)}
                />
            ))}
        </div>
    );
};
