export interface FavoriteWithRestaurant {
    id: string;
    nodeId: string;
    restaurant: {
        id: number;
        name: string;
        imageUrl: string | null;
    };
}
