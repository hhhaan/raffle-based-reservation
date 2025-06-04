'use client';

import { useState } from 'react';
import { Layout } from '@/src/widgets/layout';
import { RaffleCard } from '@/src/entities/raffle/ui/raffle-card';
import { ArrowLeft, Heart, Search, Filter } from 'lucide-react';
import { useRaffles } from '@/src/entities/raffle/hooks';

export const RaffleScreen = () => {
    const { data, isLoading, error } = useRaffles();
    const [activeCategory, setActiveCategory] = useState('전체');
    const categories = ['전체', '진행중', '오픈 예정', '종료'];

    // 카테고리에 따른 필터링 로직 추가
    const filteredRaffles =
        activeCategory === '전체'
            ? data
            : data?.filter((raffle: any) => {
                  if (activeCategory === '진행중') return raffle.status === 'ONGOING';
                  if (activeCategory === '오픈 예정') return raffle.status === 'UPCOMING';
                  if (activeCategory === '종료') return raffle.status === 'ENDED';
                  return true;
              });

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>오류 발생: {error.message}</div>;

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
                        <h2 className="text-lg font-bold">래플 {filteredRaffles?.length}개</h2>
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
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium ${
                                        activeCategory === category
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-200'
                                    }`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 래플 목록 */}
                <div className="px-4">
                    <div className="space-y-4">
                        {filteredRaffles?.map((raffle: any) => <RaffleCard key={raffle.id} {...raffle} />)}
                    </div>
                </div>

                {/* 더 보기 버튼 */}
                <div className="px-4 py-6">
                    <button className="w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        더 보기
                    </button>
                </div>
            </div>
        </Layout>
    );
};
