'use client';

import { Layout } from '@/src/widgets';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';

interface Restaurant {
    id: number;
    name: string;
    description: string;
    cuisine_type: string;
}

interface RestaurantEdge {
    node: Restaurant;
}

interface RestaurantConnection {
    edges: RestaurantEdge[];
}

interface QueryResult {
    restaurantCollection: RestaurantConnection;
}

const GET_RESTAURANTS = gql`
    query GetRestaurants {
        restaurantCollection(first: 1) {
            edges {
                node {
                    id
                    name
                    description
                    cuisine_type
                }
            }
        }
    }
`;

export function RestaurantsScreen() {
    const router = useRouter();
    const { data: restaurants, loading, error } = useQuery<QueryResult>(GET_RESTAURANTS);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">레스토랑 목록</h1>
                {restaurants?.restaurantCollection?.edges.map(({ node }) => (
                    <div
                        key={node.id}
                        className="bg-white rounded-lg shadow-md p-6 mb-4"
                        onClick={() => {
                            router.push(`/restaurants/${node.id}`);
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-2">{node.name}</h2>
                        <p className="text-gray-600 mb-2">{node.description}</p>
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                            {node.cuisine_type}
                        </span>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default RestaurantsScreen;
