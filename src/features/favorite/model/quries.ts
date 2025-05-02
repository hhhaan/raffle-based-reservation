import { gql } from '@apollo/client';

export const GET_FAVORITES_WITH_DETAILS = gql`
    query getFavoritesWithDetails {
        favoritesCollection {
            edges {
                node {
                    id
                    nodeId
                    restaurant_id
                    restaurant {
                        id
                        name
                        restaurant_imageCollection(filter: { is_primary: { eq: true } }, first: 1) {
                            edges {
                                node {
                                    id
                                    image_url
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
