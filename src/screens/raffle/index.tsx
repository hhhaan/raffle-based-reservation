'use client';

import { useState } from 'react';

import { ArrowLeft, Filter, Heart, Search } from 'lucide-react';

import { RAFFLE_STATUS, RaffleStatusType } from '@/src/entities/raffle/constants';
import { useRafflesWithParticipation } from '@/src/entities/raffle/hooks';
import { RaffleCard } from '@/src/entities/raffle/ui/raffle-card';
import { useUserStore } from '@/src/entities/user/model/store';
import { useEnterRaffle } from '@/src/features/enter-raffle/hooks';
import { Layout } from '@/src/widgets/layout';

export const RaffleScreen = () => {
    const [activeCategory, setActiveCategory] = useState<RaffleStatusType>(RAFFLE_STATUS.ALL);
    const userId = useUserStore(state => state.user?.id);

    const {
        data: raffles,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useRafflesWithParticipation(activeCategory, userId);

    const {
        participate,
        isSubmitting,
        error: participateError,
        reset: clearError,
    } = useEnterRaffle();

    const categoryMap = {
        [RAFFLE_STATUS.ALL]: '전체',
        [RAFFLE_STATUS.ONGOING]: '진행중',
        [RAFFLE_STATUS.UPCOMING]: '오픈 예정',
        [RAFFLE_STATUS.ENDED]: '종료',
    };

    const categories = Object.entries(categoryMap);

    if (raffles) {
        console.log(raffles);
    }

    if (isLoading) {
        return (
            <Layout>
                <div>로딩 중...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div>오류 발생: {error.message}</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                {/* 헤더 */}
                <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
                    <div className="flex items-center">
                        <ArrowLeft className="w-5 h-5 mr-3" />
                        <h1 className="text-lg font-bold">래플</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Search className="w-5 h-5 text-gray-500" />
                        <Heart className="w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* 래플 통계 정보 */}
                <div className="px-4 pt-4 pb-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">래플 {raffles?.length}개</h2>
                        <button className="flex items-center text-xs px-2 py-1 border border-gray-300 rounded-full">
                            <Filter className="w-3 h-3 mr-1" />
                            <span>정렬 필터</span>
                        </button>
                    </div>
                </div>

                {/* 카테고리 스크롤 */}
                <div className="px-4 mb-4">
                    <div className="overflow-x-auto">
                        <div className="flex space-x-2 py-2">
                            {categories.map(([status, label]) => (
                                <button
                                    key={status}
                                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium ${
                                        activeCategory === status
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-200'
                                    }`}
                                    onClick={() => setActiveCategory(status as RaffleStatusType)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 에러 메시지 표시 */}
                {participateError && (
                    <div className="px-4 mb-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                            {participateError.message}
                            <button onClick={clearError} className="ml-2 text-red-800 underline">
                                닫기
                            </button>
                        </div>
                    </div>
                )}

                {/* 래플 목록 */}
                <div className="px-4">
                    <div className="space-y-4">
                        {raffles?.map((raffle: any) => {
                            const raffleCardProps = {
                                ...raffle,
                                restaurant_name: raffle.restaurant?.name,
                                restaurant_image:
                                    raffle.restaurant?.restaurant_image?.[0]?.image_url,
                            };

                            return (
                                <RaffleCard
                                    key={raffle.id}
                                    {...raffleCardProps}
                                    onParticipate={participate}
                                    isParticipated={raffle.isParticipated}
                                    isSubmitting={isSubmitting}
                                    participateError={participateError}
                                    clearError={clearError}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* 더 보기 버튼 */}
                <div className="px-4 py-6">
                    {hasNextPage ? (
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            {isFetchingNextPage ? '로딩 중...' : '더 보기'}
                        </button>
                    ) : (
                        <p className="text-center text-gray-500">
                            {raffles?.length === 0 ? '래플이 없습니다' : '마지막이에요'}
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
};
