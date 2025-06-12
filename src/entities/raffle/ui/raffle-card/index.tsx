'use client';

import { useMemo } from 'react';

import Image from 'next/image';

import { Clock } from 'lucide-react';

import { useEnterRaffle } from '@/src/features/enter-raffle/hooks';

import { RAFFLE_STATUS } from '../../constants';

interface RaffleCardProps {
    id: number;
    restaurant_name: string;
    restaurant_image: string;
    status: string;
    isParticipated: boolean;
    start_datetime: string;
    end_datetime: string;
}

export const RaffleCard = (raffle: RaffleCardProps) => {
    const { participate, isSubmitting } = useEnterRaffle();

    const { raffleStatus, timeStamps } = useMemo(() => {
        const now = Date.now();
        const start = new Date(raffle.start_datetime).getTime();
        const end = new Date(raffle.end_datetime).getTime();

        let status;
        if (now < start) status = RAFFLE_STATUS.UPCOMING;
        else if (now > end) status = RAFFLE_STATUS.ENDED;
        else status = RAFFLE_STATUS.ONGOING;

        return { raffleStatus: status, timeStamps: { start, end } };
    }, [raffle.start_datetime, raffle.end_datetime]);

    const displayData = {
        name: raffle.restaurant_name || '레스토랑 이름',
        originalPrice: '99,000원',
        rafflePrice: '990원',
        discount: '99%',
        deadline: '3월 19일 (수) 11:00 당첨자 발표 예정',
        image: raffle.restaurant_image || '/default-image.jpg',
        timeLeft: '12:00:00',
    };

    const getButtonContent = () => {
        if (isSubmitting) {
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

        switch (raffleStatus) {
            case RAFFLE_STATUS.UPCOMING:
                const startDate = new Date(timeStamps.start);
                const month = startDate.getMonth() + 1;
                const date = startDate.getDate();
                const hours = startDate.getHours();
                const minutes = startDate.getMinutes();
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
            <div className="relative">
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

            <div className="p-4">
                <div className="mb-2">
                    <h3 className="text-base font-bold mb-1">{displayData.name}</h3>
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
                        if (!buttonContent.disabled) {
                            participate(raffle.id);
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
