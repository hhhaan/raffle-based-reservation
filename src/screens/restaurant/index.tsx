'use client';

import { Layout } from '@/src/widgets/layout';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';
import Image from 'next/image';
import { Bookmark, Loader2 } from 'lucide-react';
import { useRestaurantsWithFavorites } from '@/src/features/favorite/hooks';
import { useUserStore } from '@/src/entities/user/model/store';
import { useFavoriteToggle } from '@/src/features/favorite/hooks';

const RestaurantCard = ({ restaurant, isFavorite, onFavoriteToggle, isProcessing }: any) => {
    const router = useRouter();

    // 카드 클릭 핸들러
    const handleCardClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            // 즐겨찾기 버튼 클릭 시 상세 페이지로 이동하지 않음
            if ((e.target as HTMLElement).closest('.favorite-btn')) return;
            router.push(`/restaurants/${restaurant.id}`);
        },
        [router, restaurant.id]
    );

    // 즐겨찾기 버튼 클릭 핸들러
    const handleFavoriteClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            onFavoriteToggle(restaurant.id, isFavorite);
        },
        [onFavoriteToggle, restaurant.id, isFavorite]
    );

    // 이미지 URL이 없는 경우 기본 이미지 사용
    const imageUrl = restaurant.restaurant_imageCollection?.edges?.[0]?.node?.image_url || '/default-restaurant.jpg';

    return (
        <div
            className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={handleCardClick}
        >
            <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                    <Image
                        src={imageUrl}
                        alt={`${restaurant.name} 이미지`}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                    <p className="text-gray-600 mb-2 line-clamp-2">{restaurant.description}</p>
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        {restaurant.cuisine_type}
                    </span>
                </div>
                {/* 즐겨찾기 버튼 */}
                <button
                    className={`favorite-btn p-2 rounded-full hover:bg-gray-100 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleFavoriteClick}
                    disabled={isProcessing}
                    aria-label={isFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
                >
                    {isProcessing ? (
                        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                    ) : isFavorite ? (
                        <Bookmark className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    ) : (
                        <Bookmark className="w-6 h-6 text-gray-500 " />
                    )}
                </button>
            </div>
        </div>
    );
};

// 레스토랑 목록 컴포넌트 (메모이제이션 적용)
const RestaurantList = memo(({ restaurants, onFavoriteToggle, isProcessing }: any) => {
    if (restaurants.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">레스토랑이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {restaurants.map((restaurant: any) => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isFavorite={restaurant.isFavorite}
                    onFavoriteToggle={onFavoriteToggle}
                    isProcessing={isProcessing(restaurant.id)}
                />
            ))}
        </div>
    );
});

RestaurantList.displayName = 'RestaurantList';

export const RestaurantsScreen = () => {
    const { toggleFavorite, isProcessing } = useFavoriteToggle();
    const userId = useUserStore((state) => state.user?.id);
    const { data: restaurants, isLoading } = useRestaurantsWithFavorites();

    console.log(restaurants);

    // 즐겨찾기 토글 핸들러
    const handleFavoriteToggle = useCallback(
        (restaurantId: number, isFavorite: boolean) => {
            if (!userId) return; // 사용자가 로그인하지 않은 경우

            toggleFavorite({
                userId,
                restaurantId,
                isFavorite,
            });
        },
        [userId, toggleFavorite]
    );

    if (isLoading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="w-8 h-8 text-red-500 animate-spin mr-2" />
                        레스토랑 목록을 불러오는 중입니다...
                    </div>
                </div>
            </Layout>
        );
    }

    // 메인 UI
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">레스토랑 목록</h1>
                </div>

                <RestaurantList
                    restaurants={restaurants}
                    onFavoriteToggle={handleFavoriteToggle}
                    isProcessing={isProcessing}
                />
            </div>
        </Layout>
    );
};
