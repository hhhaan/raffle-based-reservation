import { Clock, Heart } from 'lucide-react';
import Image from 'next/image';

interface Raffle {
    id: number;
    name: string;
    brand: string;
    originalPrice: string;
    rafflePrice: string;
    discount: string;
    deadline: string;
    image: string;
    timeLeft: string;
}

export const RaffleCard = ({ raffle }: { raffle: Raffle }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* 이미지 섹션 */}
            <div className="relative">
                <Image
                    src={raffle.image}
                    alt={raffle.name}
                    width={1000}
                    height={256}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-3">
                    <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">{raffle.timeLeft}</div>
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
                    <div className="line-through text-xs text-gray-500 mr-2">{raffle.originalPrice}</div>
                    <div className="text-base font-bold">{raffle.rafflePrice}</div>
                    <div className="text-red-500 text-sm ml-2">{raffle.discount}</div>
                </div>

                <div className="bg-gray-100 rounded p-2 text-xs text-center text-gray-600 flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-1 text-indigo-600" />
                    {raffle.deadline}
                </div>
                <button className="w-full mt-3 py-2 bg-indigo-600 rounded text-white font-medium hover:bg-indigo-700 transition">
                    응모하기
                </button>
            </div>
        </div>
    );
};
