import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { fetchGraphQL } from '@/src/shared/api';
import { GET_RESTAURANTS_BY_IDS } from '@/src/features/favorite/model/quries';

// 즐겨찾기 레스토랑 정보를 가져오는 훅
export const useRestaurantsByIds = (ids: string[]) =>
    useQuery({
        queryKey: ['restaurants', { ids }],
        queryFn: () => fetchGraphQL(GET_RESTAURANTS_BY_IDS, { ids }),
        enabled: !!ids,
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
