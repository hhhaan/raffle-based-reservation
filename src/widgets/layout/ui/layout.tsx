'use client';

import { Navigation } from './navigation';
import { Header } from './header';
import '@/src/shared/lib/vendor/vendor.ts';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col flex-1 w-full max-w-md mx-auto bg-gray-50 shadow-lg overflow-hidden">
                <Header />
                <main className="pb-20">{children}</main>
                <Navigation />
            </div>
        </div>
    );
};
