'use client';

import { Layout } from '@/src/widgets';

export function RestaurantDetailScreen() {
    // 정적인 UI만 표시하기 위한 임시 데이터
    const restaurantData = {
        name: '레스토랑 이름',
        rating: 4.5,
        priceRange: '₩₩',
        cuisine: '한식',
        description: '레스토랑에 대한 상세한 설명이 이곳에 표시됩니다. 맛있는 음식과 좋은 분위기를 제공합니다.',
        address: '서울시 강남구 테헤란로 123',
        phone: '02-123-4567',
        openingHours: '매일 11:00 - 22:00',
        popularDishes: ['불고기', '된장찌개', '김치찌개', '비빔밥'],
        facilities: ['주차', '와이파이', '단체석', '예약'],
        images: [],
        primaryImage: null,
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8">
                    {/* 이미지 헤더 */}
                    <div className="w-full h-80 bg-gray-200 rounded-lg mb-4 flex items-center justify-center shadow-md">
                        <span className="text-gray-600 text-xl">레스토랑 메인 이미지</span>
                    </div>

                    {/* 작은 이미지 갤러리 */}
                    <div className="grid grid-cols-4 gap-2 h-24">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                <span className="text-gray-500 text-sm">이미지 {item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 레스토랑 정보 섹션 */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* 왼쪽 컬럼 - 기본 정보 */}
                    <div className="md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl font-bold">{restaurantData.name}</h1>
                            <div className="flex items-center gap-2">
                                <span className="bg-indigo-600 text-white px-2 py-1 rounded-md font-bold">
                                    {restaurantData.rating}
                                </span>
                                <span className="text-gray-500">{restaurantData.priceRange}</span>
                            </div>
                        </div>

                        {/* 예약하기 버튼 */}
                        <div className="my-6">
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition duration-200">
                                예약하기
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                {restaurantData.cuisine}
                            </span>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">{restaurantData.description}</p>
                        </div>

                        {/* 인기 메뉴 */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
                                인기 메뉴
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {restaurantData.popularDishes.map((dish, index) => (
                                    <div key={index} className="flex gap-3 items-center">
                                        {/* 메뉴 이미지 임시 처리 */}
                                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                            <span className="text-xs text-gray-500">사진</span>
                                        </div>
                                        <span className="font-medium">{dish}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 리뷰 섹션 */}
                        <div>
                            <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
                                리뷰
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg mb-4 hover:shadow-sm transition-shadow">
                                <div className="flex justify-between">
                                    <span className="font-medium">방문자1</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">★★★★☆</span>
                                        <span className="text-sm text-gray-500 ml-1">4.0</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-700">
                                    음식이 정말 맛있었습니다. 특히 불고기가 일품이었어요!
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg hover:shadow-sm transition-shadow">
                                <div className="flex justify-between">
                                    <span className="font-medium">방문자2</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">★★★★★</span>
                                        <span className="text-sm text-gray-500 ml-1">5.0</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-700">
                                    서비스도 좋고 분위기도 좋았습니다. 다음에 또 방문할게요!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 컬럼 - 부가 정보 */}
                    <div className="md:w-1/3">
                        <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm mb-6 hover:shadow-md transition-shadow">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                                식당 정보
                            </h2>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="w-24 text-gray-500">주소</span>
                                    <span>{restaurantData.address}</span>
                                </div>

                                <div className="flex items-start">
                                    <span className="w-24 text-gray-500">영업시간</span>
                                    <span>{restaurantData.openingHours}</span>
                                </div>

                                <div className="flex items-start">
                                    <span className="w-24 text-gray-500">전화번호</span>
                                    <span>{restaurantData.phone || '정보 없음'}</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                {/* 지도 자리 (임시 div로 처리) */}
                                <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center">
                                    <span className="text-gray-500">지도</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                                편의 시설
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {restaurantData.facilities.map((facility, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                    >
                                        {facility}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
