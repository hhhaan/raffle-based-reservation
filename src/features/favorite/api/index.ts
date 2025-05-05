import { GET_FAVORITE_RESTAURANTS } from '../model/quries';
import { fetchGraphQL } from '@/src/shared/api/';

export const getFavoriteRestaurants = (userId: string) => {
    return fetchGraphQL(GET_FAVORITE_RESTAURANTS, { userId });
};
