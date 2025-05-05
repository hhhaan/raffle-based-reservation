export const GET_FAVORITES = `
    query GetFavorites {
    favoritesCollection {
        edges {
        node {
            id
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

// 즐겨찾기 추가 뮤테이션
export const ADD_FAVORITE = `
    mutation AddFavorite($userId: UUID!, $restaurantId: Int!) {
        insertIntofavoritesCollection(objects: [{ user_id: $userId, restaurant_id: $restaurantId }]) {
            records {
                id
                restaurant_id
            }
        }
    }
`;

// 즐겨찾기 삭제 뮤테이션
export const REMOVE_FAVORITE = `
    mutation RemoveFavorite($userId: UUID!, $restaurantId: Int!) {
        deleteFromfavoritesCollection(filter: { user_id: { eq: $userId }, restaurant_id: { eq: $restaurantId } }) {
            affectedCount
        }
    }
`;
