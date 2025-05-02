import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">{children}</div>;
};
