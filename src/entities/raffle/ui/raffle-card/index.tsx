'use client';

import Image from 'next/image';

import { Clock } from 'lucide-react';

import { RAFFLE_STATUS } from '../../constants';

interface RaffleCardProps {
    id: string;
    restaurant_name: string;
    restaurant_image: string;
    status: string;
    isParticipated: boolean;
    onParticipate?: (raffleId: string) => void;
    start_datetime: string;
    end_datetime: string;
    isSubmitting?: boolean;
}

export const RaffleCard = (raffle: RaffleCardProps) => {
    // 일부 데이터가 없을 경우 샘플 데이터로 보완
    const displayData = {
        name: raffle.restaurant_name || '레스토랑 이름',
        // brand: raffle.restaurant_name || '브랜드',
        originalPrice: '99,000원',
        rafflePrice: '990원',
        discount: '99%',
        deadline: '3월 19일 (수) 11:00 당첨자 발표 예정',
        image: raffle.restaurant_image || '/default-image.jpg',
        timeLeft: '12:00:00',
    };

    const now = new Date().getTime();
    const startTime = new Date(raffle.start_datetime).getTime();
    const endTime = new Date(raffle.end_datetime).getTime();

    const getRaffleStatus = () => {
        if (now < startTime) return RAFFLE_STATUS.UPCOMING;
        if (now > endTime) return RAFFLE_STATUS.ENDED;
        return RAFFLE_STATUS.ONGOING;
    };

    const getButtonContent = () => {
        // 제출 중일 때
        if (raffle.isSubmitting) {
            return {
                text: '응모 중...',
                className:
                    'w-full mt-3 py-2 bg-indigo-400 cursor-not-allowed rounded text-white font-medium',
                disabled: true,
            };
        }

        if (raffle.isParticipated) {
            return {
                text: '응모 완료',
                className:
                    'w-full mt-3 py-2 bg-gray-400 cursor-not-allowed rounded text-white font-medium',
                disabled: true,
            };
        }

        const status = getRaffleStatus();
        switch (status) {
            case RAFFLE_STATUS.UPCOMING:
                const startDate = new Date(raffle.start_datetime);
                const month = startDate.getMonth() + 1;
                const date = startDate.getDate();
                const hours = startDate.getHours().toString().padStart(2, '0');
                const minutes = startDate.getMinutes().toString().padStart(2, '0');
                return {
                    text: `${month}월 ${date}일 ${hours}:${minutes} 오픈`,
                    className:
                        'w-full mt-3 py-2 bg-gray-600 rounded text-white font-medium cursor-default',
                    disabled: true,
                };
            case RAFFLE_STATUS.ENDED:
                return {
                    text: '종료된 래플',
                    className:
                        'w-full mt-3 py-2 bg-gray-400 rounded text-white font-medium cursor-default',
                    disabled: true,
                };
            default:
                return {
                    text: '응모하기',
                    className:
                        'w-full mt-3 py-2 bg-indigo-600 rounded text-white font-medium hover:bg-indigo-700 transition',
                    disabled: false,
                };
        }
    };

    const buttonContent = getButtonContent();

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* 이미지 섹션 */}
            <div className="relative">
                {/* next/image 에러 방지를 위해 임시로 일반 img 태그 사용 */}
                <Image
                    src={displayData.image}
                    alt={displayData.name}
                    width={100}
                    height={100}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-3">
                    <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {displayData.timeLeft}
                    </div>
                </div>
            </div>

            {/* 정보 섹션 */}
            <div className="p-4">
                <div className="mb-2">
                    <h3 className="text-base font-bold mb-1">{displayData.name}</h3>
                    {/* <p className="text-sm text-gray-500">{displayData.brand}</p> */}
                </div>

                <div className="flex items-end mb-3">
                    <div className="line-through text-xs text-gray-500 mr-2">
                        {displayData.originalPrice}
                    </div>
                    <div className="text-base font-bold">{displayData.rafflePrice}</div>
                    <div className="text-red-500 text-sm ml-2">{displayData.discount}</div>
                </div>

                <div className="bg-gray-100 rounded p-2 text-xs text-center text-gray-600 flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-1 text-indigo-600" />
                    {displayData.deadline}
                </div>
                <button
                    className={buttonContent.className}
                    onClick={() => {
                        if (!buttonContent.disabled && !raffle.isSubmitting) {
                            raffle.onParticipate?.(raffle.id);
                        }
                    }}
                    disabled={buttonContent.disabled}
                >
                    {buttonContent.text}
                </button>
            </div>
        </div>
    );
};
