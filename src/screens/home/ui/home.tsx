'use client';

import { Layout } from '@/src/widgets';
import { Clock, Users, Sparkles } from 'lucide-react';

export function HomeScreen() {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                {/* 메인 콘텐츠 */}
                <div className="container mx-auto px-4 py-4 pb-24">
                    {/* 진행중인 래플 배너 */}
                    <div className="mb-6">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-sm overflow-hidden">
                            <div className="relative p-6 text-white">
                                <h2 className="text-2xl font-bold mb-2">지금 참여 가능한 래플</h2>
                                <p className="mb-4">인기 맛집 예약의 새로운 기회!</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="bg-white text-purple-600 font-bold px-3 py-1 rounded-full text-sm">
                                            진행중 32
                                        </span>
                                    </div>
                                    <button className="bg-white text-purple-600 font-bold px-4 py-2 rounded-lg text-sm">
                                        모두 보기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* todo
                스크롤 안 보이도록
                */}

                    {/* 핫 래플 - 마감임박 */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold">🔥 마감 임박 래플</h2>
                                <p className="text-sm text-gray-500">놓치지 마세요! 곧 마감됩니다</p>
                            </div>
                            <button className="text-sm text-purple-600">더보기</button>
                        </div>

                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {[
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
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="min-w-[280px] bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 border border-red-100"
                                >
                                    <div className="relative">
                                        <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            마감임박
                                        </div>
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
                                                <Clock className="w-4 h-4 text-red-500 mr-1" />
                                                <span className="text-sm font-medium text-red-500">
                                                    마감: {item.endTime}
                                                </span>
                                            </div>
                                            <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                                                확률 {item.odds}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-900">{item.price}</span>
                                            <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
                                                참여하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 카테고리 버튼 */}
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-3">카테고리</h2>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { name: '맛집', icon: '🍽️' },
                                { name: '카페', icon: '☕' },
                                { name: '팝업', icon: '🎪' },
                                { name: '콘서트', icon: '🎵' },
                                { name: '전시회', icon: '🎨' },
                                { name: '클럽', icon: '🕺' },
                                { name: '행사', icon: '🎉' },
                                { name: '취미', icon: '🎮' },
                            ].map((category) => (
                                <div key={category.name} className="bg-white p-3 rounded-lg shadow-sm text-center">
                                    <div className="text-xl mb-1">{category.icon}</div>
                                    <div className="text-xs">{category.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 인기 래플 */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold">🏆 인기 래플</h2>
                                <p className="text-sm text-gray-500">지금 가장 많이 참여하는 래플</p>
                            </div>
                            <button className="text-sm text-purple-600">더보기</button>
                        </div>

                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {[
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
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="min-w-[280px] bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0"
                                >
                                    <div className="relative">
                                        <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300"></div>
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
                                                <Users className="w-4 h-4 text-gray-500 mr-1" />
                                                <span className="text-sm text-gray-500">
                                                    {item.participants.toLocaleString()}명 참여
                                                </span>
                                            </div>
                                            <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                                                확률 {item.odds}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-900">{item.price}</span>
                                            <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
                                                참여하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 신규 래플 */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold">✨ 새로 오픈한 래플</h2>
                                <p className="text-sm text-gray-500">방금 시작된 따끈따끈한 래플</p>
                            </div>
                            <button className="text-sm text-purple-600">더보기</button>
                        </div>

                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {[
                                {
                                    name: '루지 아이스크림',
                                    type: '디저트',
                                    location: '가로수길',
                                    time: '10분 전',
                                    odds: '1:21',
                                    price: '2,000원',
                                },
                                {
                                    name: '서울포레스트',
                                    type: '프랑스 요리',
                                    location: '용산',
                                    time: '1시간 전',
                                    odds: '1:32',
                                    price: '5,000원',
                                },
                                {
                                    name: '아티스트리',
                                    type: '전시회',
                                    location: '북촌',
                                    time: '3시간 전',
                                    odds: '1:45',
                                    price: '3,000원',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="min-w-[280px] bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 border border-blue-100"
                                >
                                    <div className="relative">
                                        <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                                        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            NEW
                                        </div>
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
                                                <Sparkles className="w-4 h-4 text-blue-500 mr-1" />
                                                <span className="text-sm text-blue-500">오픈: {item.time}</span>
                                            </div>
                                            <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                                                확률 {item.odds}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-gray-900">{item.price}</span>
                                            <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
                                                참여하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
