'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Image from 'next/image';
import { FavoriteButton } from '@/src/features/favorite/ui/favorite-button';

export interface ToggleFavoriteParams {
    userId: string;
    restaurantId: number;
    isFavorite: boolean;
}
export interface Restaurant {
    id: string;
    name: string;
    description: string;
    // cuisine_type: string;
    imageUrl: string;
    isFavorite: boolean;
}
interface RestaurantCardProps {
    restaurant: Restaurant;
    userId: string;
    onFavoriteToggle: (params: ToggleFavoriteParams) => void;
    isProcessing: boolean;
    onClick?: () => void;
}

export const RestaurantCard = ({ restaurant, onFavoriteToggle, isProcessing, userId }: RestaurantCardProps) => {
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

    // 즐겨찾기 토글 핸들러 - FavoriteButton에 전달할 콜백
    const handleFavoriteToggle = useCallback(() => {
        onFavoriteToggle({ userId, restaurantId: Number(restaurant.id), isFavorite: restaurant.isFavorite });
    }, [onFavoriteToggle, restaurant.id, restaurant.isFavorite, userId]);

    // 이미지 URL이 없는 경우 기본 이미지 사용
    const imageUrl = restaurant.imageUrl;

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
                    {/* <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        {restaurant.cuisine_type}
                    </span> */}
                </div>

                {/* 분리된 즐겨찾기 버튼 컴포넌트 사용 */}
                <FavoriteButton
                    isFavorite={restaurant.isFavorite}
                    isProcessing={isProcessing}
                    onToggle={handleFavoriteToggle}
                />
            </div>
        </div>
    );
};
