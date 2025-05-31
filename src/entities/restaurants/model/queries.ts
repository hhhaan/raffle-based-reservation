export const GET_RESTAURANTS_ALL = `
    query GetRestaurantsAll {
        restaurantCollection(first: 10) {
            edges {
                node {
                    id
                    name
                    description
                    cuisine_type
                    restaurant_imageCollection(filter: { is_primary: { eq: true } }) {
                        edges {
                            node {
                                image_url
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_RESTAURANT_DETAIL = `
    query GetRestaurant($id: Int!) {
        restaurantCollection {
            edges {
                node {
                    id
                    name
                    restaurant_imageCollection {
                        edges {
                            node {
                                image_url
                                is_primary
                            }
                        }
                    }
                }
            }
        }
    }
`;
