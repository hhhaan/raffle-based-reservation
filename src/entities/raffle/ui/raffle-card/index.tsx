import { Clock } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface RaffleCardProps {
    id: number;
    restaurantName: string;
    restaurantImage: string;
    status: string;
}

export const RaffleCard = (raffle: RaffleCardProps) => {
    // 일부 데이터가 없을 경우 샘플 데이터로 보완
    const displayData = {
        name: raffle.restaurantName || '레스토랑 이름',
        brand: raffle.restaurantName || '브랜드',
        originalPrice: '99,000원',
        rafflePrice: '990원',
        discount: '99%',
        deadline: '3월 19일 (수) 11:00 당첨자 발표 예정',
        image: raffle.restaurantImage || '/default-image.jpg',
        timeLeft: '12:00:00',
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    // todo 응모 처리 로직 추가
    const enterRaffle = async () => {
        if (isSubmitting) return; // 중복 클릭 방지
        setIsSubmitting(true);
        try {
            // todo 응모 처리 로직 추가
            console.log(raffle.id, '응모하기');

            // if (error: any) {
            //     throw new Error('응모 처리 중 오류가 발생했습니다.');
            // }
        } catch (error) {
            console.error('응모 오류:', error);
        } finally {
            // 디바운싱 처리
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);
        }
    };

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
                    <p className="text-sm text-gray-500">{displayData.brand}</p>
                </div>

                <div className="flex items-end mb-3">
                    <div className="line-through text-xs text-gray-500 mr-2">{displayData.originalPrice}</div>
                    <div className="text-base font-bold">{displayData.rafflePrice}</div>
                    <div className="text-red-500 text-sm ml-2">{displayData.discount}</div>
                </div>

                <div className="bg-gray-100 rounded p-2 text-xs text-center text-gray-600 flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-1 text-indigo-600" />
                    {displayData.deadline}
                </div>
                <button
                    // onClick={enterRaffle}
                    onClick={() => {
                        console.log(raffle);
                    }}
                    className="w-full mt-3 py-2 bg-indigo-600 rounded text-white font-medium hover:bg-indigo-700 transition"
                >
                    응모하기
                </button>
            </div>
        </div>
    );
};
