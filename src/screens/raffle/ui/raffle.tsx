'use client';

import { useState } from 'react';
import { Layout } from '@/src/widgets';
import { ArrowLeft, Clock, Heart, Search, Filter } from 'lucide-react';

export const RaffleScreen = () => {
    // 카테고리 상태 관리
    const [activeCategory, setActiveCategory] = useState('전체');

    // 카테고리 목록
    const categories = ['전체', '진행중', '오픈 예정', '종료'];

    // 래플 데이터
    const raffles = [
        {
            id: 1,
            name: '요리하는 돌아이 옥수 디핀 디너',
            brand: 'Deepin',
            originalPrice: '99,000원',
            rafflePrice: '99,000원',
            discount: '99%',
            deadline: '3월 19일 (수) 11:00 당첨자 발표 예정',
            image: '/api/placeholder/400/400',
            timeLeft: '00:00:00',
        },
        {
            id: 2,
            name: '모수 서울',
            brand: 'MOSU',
            originalPrice: '1,250,000원',
            rafflePrice: '1,000원',
            discount: '99%',
            deadline: '3월 19일 (수) 11:00 당첨자 발표 예정',
            image: '/api/placeholder/400/400',
            timeLeft: '00:00:00',
        },
    ];

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
                        <h2 className="text-lg font-bold">래플 875개</h2>
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
                        {raffles.map((raffle) => (
                            <div key={raffle.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {/* 이미지 섹션 */}
                                <div className="relative">
                                    {/* <img src={raffle.image} alt={raffle.name} className="w-full h-64 object-cover" /> */}
                                    <div className="w-full h-64 object-cover"></div>
                                    <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-3">
                                        <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                            {raffle.timeLeft}
                                        </div>
                                        <Heart className="w-6 h-6 text-white stroke-white fill-transparent hover:fill-white" />
                                    </div>
                                </div>

                                {/* 정보 섹션 */}
                                <div className="p-4">
                                    <div className="mb-2">
                                        <h3 className="text-base font-bold mb-1">{raffle.name}</h3>
                                        <p className="text-sm text-gray-500">{raffle.brand}</p>
                                    </div>

                                    <div className="flex items-end mb-3">
                                        <div className="line-through text-xs text-gray-500 mr-2">
                                            {raffle.originalPrice}
                                        </div>
                                        <div className="text-base font-bold">{raffle.rafflePrice}</div>
                                        <div className="text-red-500 text-sm ml-2">{raffle.discount}</div>
                                    </div>

                                    <div className="bg-gray-100 rounded p-2 text-xs text-center text-gray-600 flex items-center justify-center">
                                        <Clock className="w-3 h-3 mr-1 text-indigo-600" />
                                        {raffle.deadline}
                                    </div>
                                </div>
                            </div>
                        ))}
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
