'use client';

import { Layout } from '@/src/widgets';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_FAVORITES_WITH_DETAILS, FavoriteWithRestaurant } from '@/src/features/favorite/model';

export const FavoriteScreen = () => {
    const { data, loading, error } = useQuery(GET_FAVORITES_WITH_DETAILS);
    const [isImageError, setIsImageError] = useState<Record<string, boolean>>({});

    // 에러 처리
    if (error) {
        return (
            <Layout>
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">즐겨찾기한 레스토랑</h1>
                    <div className="text-red-500">오류가 발생했습니다: {error.message}</div>
                </div>
            </Layout>
        );
    }

    // 데이터 변환 및 필터링 (null이나 undefined 항목 제거)
    const favorites =
        data?.favoritesCollection?.edges
            .filter(({ node }: { node: FavoriteWithRestaurant }) => node?.restaurant)
            .map(({ node }: { node: FavoriteWithRestaurant }) => ({
                id: node.id,
                nodeId: node.nodeId,
                restaurant: {
                    id: node.restaurant.id,
                    name: node.restaurant.name,
                    imageUrl: node.restaurant.restaurant_imageCollection?.edges[0]?.node?.image_url || null,
                },
            })) || [];

    const handleImageError = (id: string) => {
        setIsImageError((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">즐겨찾기한 레스토랑</h1>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 로딩 스켈레톤 UI */}
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="border rounded-lg overflow-hidden shadow-sm animate-pulse">
                                <div className="w-full h-40 bg-gray-200"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">즐겨찾기한 레스토랑이 없습니다.</p>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                            레스토랑 둘러보기
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((favorite) => (
                            <div
                                key={favorite.id}
                                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {favorite.restaurant.imageUrl && !isImageError[favorite.id] ? (
                                    <img
                                        src={favorite.restaurant.imageUrl}
                                        alt={`${favorite.restaurant.name} 이미지`}
                                        className="w-full h-40 object-cover"
                                        onError={() => handleImageError(favorite.id)}
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">이미지 없음</span>
                                    </div>
                                )}

                                <div className="p-4">
                                    <h2 className="font-semibold text-lg">{favorite.restaurant.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};
