'use client';

import { Navigation } from '../navigation';
import { Bell, Menu } from 'lucide-react';
import '@/src/shared/lib/vendor/vendor.ts';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <Header /> */}
            <main className="pb-20">{children}</main>
            <Navigation />
        </div>
    );
}

const Header = () => {
    return (
        <div className="sticky top-0 z-10 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-xl font-bold text-purple-600">티켓챗</div>
                <div className="flex items-center space-x-2">
                    <button className="p-2">
                        <Bell className="h-6 w-6" />
                    </button>
                    <button className="p-2">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};
