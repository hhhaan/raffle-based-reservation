import { fetchGraphQL } from '@/src/shared/api';
import { GET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from '../model/queries';

export const getFavorites = () => fetchGraphQL(GET_FAVORITES);

export const addFavoriteItem = (userId: string, restaurantId: number) =>
    fetchGraphQL(ADD_FAVORITE, { userId, restaurantId });

export const removeFavoriteItem = (userId: string, restaurantId: number) =>
    fetchGraphQL(REMOVE_FAVORITE, { userId, restaurantId });
