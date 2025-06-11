'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Clock, Users } from 'lucide-react';

import { axiosClient } from '@/src/shared/utils';
import { Layout } from '@/src/widgets/layout';

// 공통 카드 컴포넌트
const RaffleCard = ({
    item,
    badgeText = '',
    badgeColor = '',
    iconElement = null,
    statusText = '',
    statusColor = '',
    borderColor = '',
}) => {
    return (
        <div
            className={`min-w-[280px] bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 ${borderColor}`}
        >
            <div className="relative">
                <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                {badgeText && (
                    <div
                        className={`absolute top-3 right-3 ${badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}
                    >
                        {badgeText}
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-gray-200">
                        {item.type} • {item.location}
                    </p>
                </div>
            </div>
            <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        {iconElement}
                        <span className={`text-sm ${statusColor || 'text-gray-500'}`}>
                            {statusText}
                        </span>
                    </div>
                    <div className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded">
                        확률 {item.odds}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">{item.price}</span>
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                        참여하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export function HomeScreen() {
    const router = useRouter();
    const deadlineRaffles = [
        {
            name: '오마카세 진',
            type: '스시',
            location: '강남',
            endTime: '오늘 18:00',
            odds: '1:42',
            price: '3,000원',
        },
        {
            name: '제로투레스',
            type: '스테이크',
            location: '성수',
            endTime: '오늘 20:00',
            odds: '1:28',
            price: '5,000원',
        },
        {
            name: '정식당',
            type: '한식',
            location: '압구정',
            endTime: '내일 12:00',
            odds: '1:76',
            price: '2,000원',
        },
    ];

    const popularRaffles = [
        {
            name: '타르틴 베이커리',
            type: '베이커리',
            location: '연남동',
            participants: 1872,
            odds: '1:187',
            price: '1,000원',
        },
        {
            name: '엘본더테이블',
            type: '이탈리안',
            location: '청담',
            participants: 1543,
            odds: '1:154',
            price: '3,000원',
        },
        {
            name: '뉴진스 팝업',
            type: '팝업스토어',
            location: '강남',
            participants: 3821,
            odds: '1:382',
            price: '2,000원',
        },
        {
            name: '토이스토리 전시',
            type: '전시회',
            location: '코엑스',
            participants: 1320,
            odds: '1:132',
            price: '4,000원',
        },
    ];

    const getRestaurants = async () => {
        try {
            const response = await axiosClient.get('/restaurant');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRestaurants();
    }, []);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                {/* 메인 콘텐츠 */}
                <div className="container mx-auto px-4 py-4 ">
                    {/* 진행중인 래플 배너 */}
                    <div className="mb-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-sm overflow-hidden">
                            <div className="relative p-6 text-white">
                                <h2 className="text-2xl font-bold mb-2">지금 참여 가능한 래플</h2>
                                <p className="mb-4">더 이상 불법 매크로와 경쟁하지 마세요!</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="bg-white text-indigo-600 font-bold px-3 py-1 rounded-full text-sm">
                                            진행중 32
                                        </span>
                                    </div>
                                    <button
                                        className="bg-white text-indigo-600 font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                                        onClick={() => router.push('/raffles')}
                                    >
                                        모두 보기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 핫 래플 - 마감임박 */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold">🔥 마감 임박 래플</h2>
                                <p className="text-sm text-gray-500">
                                    놓치지 마세요! 곧 마감됩니다
                                </p>
                            </div>
                            <button className="text-sm text-indigo-600">더보기</button>
                        </div>

                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {deadlineRaffles.map((item, index) => (
                                <RaffleCard
                                    key={index}
                                    item={item}
                                    badgeText="마감임박"
                                    badgeColor="bg-red-500"
                                    iconElement={<Clock className="w-4 h-4 text-red-500 mr-1" />}
                                    statusText={`마감: ${item.endTime}`}
                                    statusColor="font-medium text-red-500"
                                    borderColor="border border-red-100"
                                />
                            ))}
                        </div>
                    </div>
                    {/* 인기 래플 */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold">🏆 인기 래플</h2>
                                <p className="text-sm text-gray-500">
                                    지금 가장 많이 참여하는 래플
                                </p>
                            </div>
                            <button className="text-sm text-indigo-600">더보기</button>
                        </div>

                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {popularRaffles.map((item, index) => (
                                <RaffleCard
                                    key={index}
                                    item={item}
                                    iconElement={<Users className="w-4 h-4 text-gray-500 mr-1" />}
                                    statusText={`${item.participants.toLocaleString()}명 참여`}
                                />
                            ))}
                        </div>
                    </div>
                    {/* 레스토랑 목록 */}
                    <div></div>
                </div>
            </div>
        </Layout>
    );
}
