'use client';

import { Layout } from '@/src/widgets';
import { useUserStore } from '@/src/entities/user/model/store';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useFavoriteToggle } from '@/src/features/favorite/hooks';
import { useFavoriteRestaurants } from '@/src/features/favorite/hooks';
import { useState, useEffect } from 'react';
import { RestaurantCard } from '@/src/widgets/restaurant-card';

export const FavoriteScreen = () => {
    const userId = useUserStore((state) => state.user?.id);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 기존 훅 사용
    const { toggleFavorite, isProcessing, error, resetError } = useFavoriteToggle();
    const { data: favoriteRestaurants, isLoading } = useFavoriteRestaurants(userId!);

    // 에러 발생 시 처리
    useEffect(() => {
        if (error) {
            setErrorMessage('즐겨찾기 작업 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            // 3초 후 에러 메시지 자동으로 숨기기
            const timer = setTimeout(() => {
                setErrorMessage(null);
                resetError();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, resetError]);

    // 로딩 상태 처리
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

    if (favoriteRestaurants) {
        console.log(favoriteRestaurants);
    }

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">즐겨찾기한 레스토랑</h1>

                {/* 에러 메시지 표시 */}
                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        {errorMessage}
                    </div>
                )}

                {/* 즐겨찾기 목록 */}
                {!favoriteRestaurants || favoriteRestaurants.length === 0 ? (
                    <div className="text-center p-6 bg-gray-100 rounded-lg">즐겨찾기한 레스토랑이 없습니다.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favoriteRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                // 항상 즐겨찾기 상태로 표시
                                restaurant={{ ...restaurant, isFavorite: true }}
                                userId={userId!}
                                onFavoriteToggle={toggleFavorite}
                                isProcessing={isProcessing(restaurant.id)}
                                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};
