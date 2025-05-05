import { useCallback } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import { useUserStore } from '@/src/entities/user/model/store';

interface FavoriteButtonProps {
    isFavorite: boolean;
    isProcessing: boolean;
    onToggle: () => void;
}

export const FavoriteButton = ({ isFavorite, isProcessing, onToggle }: FavoriteButtonProps) => {
    const { isLoggedIn, redirectToLogin } = useUserStore();

    const handleClick = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            e.stopPropagation();

            if (!isLoggedIn) {
                console.log('로그인 필요');
                redirectToLogin();
                return;
            }
            onToggle();
        },
        [onToggle, isLoggedIn, redirectToLogin]
    );

    return (
        <button
            className={`favorite-btn p-2 rounded-full hover:bg-gray-100 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            disabled={isProcessing}
            aria-label={isFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
        >
            {isProcessing ? (
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : isFavorite ? (
                <Bookmark className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            ) : (
                <Bookmark className="w-6 h-6 text-gray-500" />
            )}
        </button>
    );
};
