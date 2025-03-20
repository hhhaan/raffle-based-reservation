import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createClient } from '@/src/shared/utils/supabase/client';

const supabase = createClient();

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

// 인증 헤더
const authLink = setContext(async (_, { headers }) => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token;

    return {
        headers: {
            ...headers,
            apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${token}`,
        },
    };
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {},
            },
        },
    }),
});

export { apolloClient };
