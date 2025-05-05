import { useFavoriteIds } from './useFavoriteIds';
import { useRestaurantsByIds } from './useRestaurantsByIds';

export const useFavoriteRestaurants = (userId: string) => {
    // 1. 즐겨찾기 ID 목록 가져오기
    const { data: favoriteIds, isLoading: isLoadingIds, error: idsError } = useFavoriteIds(userId);

    // 2. ID 목록으로 레스토랑 정보 가져오기
    const {
        data: restaurants,
        isLoading: isLoadingRestaurants,
        error: restaurantsError,
    } = useRestaurantsByIds(favoriteIds!);

    // 3. 로딩 및 에러 상태 통합
    const isLoading = isLoadingIds || isLoadingRestaurants;
    const error = idsError || restaurantsError;

    return {
        data: restaurants,
        isLoading,
        error,
    };
};
