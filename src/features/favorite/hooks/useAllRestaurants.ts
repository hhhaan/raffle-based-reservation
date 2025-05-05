'use client';

import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { fetchGraphQL } from '@/src/shared/api';
import { GET_RESTAURANTS_ALL } from '@/src/entities/restaurants/model/queries';

export const useAllRestaurants = () => {
    return useQuery({
        queryKey: ['restaurants', 'all'],
        queryFn: () => fetchGraphQL(GET_RESTAURANTS_ALL),
        select: (data) => {
            return _.map(_.get(data, 'restaurantCollection.edges', []), (edge) => {
                const node = _.get(edge, 'node', {});
                const imageEdges = _.get(node, 'restaurant_imageCollection.edges', []);
                const imageUrl = _.get(imageEdges[0], 'node.image_url', '');

                return {
                    id: node.id,
                    name: node.name,
                    description: node.description,
                    imageUrl: imageUrl || '/images/default-restaurant.jpg',
                };
            });
        },
    });
};
