export const GET_RAFFLES = `
    query GetRaffles {
        raffleCollection {
            edges {
                node {
                    id
                    nodeId
                    status
                    restaurant {
                        name
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
    }
`;
