'use client';

import { Layout } from '@/src/widgets/layout';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useFavoriteToggle } from '@/src/features/favorite/hooks';
import { useFavoriteRestaurants } from '@/src/features/favorite/hooks';
import { RestaurantCard } from '@/src/entities/restaurant/ui/restaurant-card';
import { useUserStore } from '@/src/entities/user/model/store';

export const FavoriteScreen = () => {
    const userId = useUserStore((state) => state.user?.id);
    const router = useRouter();

    const { toggleFavorite, isProcessing, error } = useFavoriteToggle();
    const { data: restaurants, isLoading } = useFavoriteRestaurants();

    if (isLoading) {
        return (
            <Layout>
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">즐겨찾기한 레스토랑</h1>
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="w-8 h-8 text-red-500 animate-spin mr-2" />
                        <span>즐겨찾기 목록을 불러오는 중입니다...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">즐겨찾기한 레스토랑</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        즐겨찾기 작업 중 오류가 발생했습니다.
                    </div>
                )}

                {!restaurants?.length ? (
                    <div className="text-center p-6 bg-gray-100 rounded-lg">즐겨찾기한 레스토랑이 없습니다.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {restaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={{
                                    ...restaurant,
                                    imageUrl: restaurant.restaurant_image?.[0]?.image_url || '/default-restaurant.jpg',
                                }}
                                userId={userId!}
                                onFavoriteToggle={toggleFavorite}
                                isProcessing={isProcessing(restaurant.id!)}
                                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};
