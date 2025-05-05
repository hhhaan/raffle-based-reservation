export const GET_FAVORITE_RESTAURANTS = `
query GetFavoriteRestaurants($userId: String!) {
  favoritesCollection(filter: { user_id: { eq: $userId } }) {
    edges {
      node {
        restaurant_id
        user_id
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

export const GET_FAVORITE_RESTAURANT_IDS = `
  query getFavoriteRestaurantIds($userId: String!) {
    favoritesCollection(filter: { user_id: { eq: $userId } }) {
      edges {
        node {
          restaurant_id
        }
      }
    }
  }
`;

export const GET_RESTAURANTS_BY_IDS = `
query GetRestaurantsByIds($ids: [Int!]) {
  restaurantCollection(filter: { id: { in: $ids } }) {
    edges {
      node {
        id
        name
        description
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
