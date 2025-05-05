'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL } from '@/src/shared/api';
import { GET_FAVORITE_RESTAURANT_IDS } from '../model/quries';
import _ from 'lodash';

export const useFavoriteIds = (userId: string) => {
    return useQuery({
        queryKey: ['favoriteIds', userId],
        queryFn: () => fetchGraphQL(GET_FAVORITE_RESTAURANT_IDS, { userId }),
        enabled: !!userId,
        select: (data) => {
            // ID 목록만 추출
            return _.map(_.get(data, 'favoritesCollection.edges', []), (edge) => _.get(edge, 'node.restaurant_id'));
        },
    });
};
