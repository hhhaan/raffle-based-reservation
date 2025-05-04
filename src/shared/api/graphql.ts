import axios from 'axios';

export const graphqlClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
    headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
});

export const fetchGraphQL = async (query: string, variables = {}) => {
    const response = await graphqlClient.post('', {
        query,
        variables,
    });

    if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
};
