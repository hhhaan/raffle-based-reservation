import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/src/shared/lib';
import AuthProvider from './auth-provider';

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>{children}</AuthProvider>
        </ApolloProvider>
    );
}
