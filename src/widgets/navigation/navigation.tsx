'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, Ticket, User } from 'lucide-react';

export function Navigation() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 mt-auto border-t py-2 border-gray-200 bg-white">
            <div className="flex justify-around pt-2 pb-1">
                <button className="flex flex-col items-center" onClick={() => router.push('/')}>
                    <Home className={`h-5 w-5 mb-1 ${pathname === '/' ? 'text-purple-600' : 'text-gray-500'}`} />
                    <span className={`text-sm ${pathname === '/' ? 'text-purple-600' : 'text-gray-500'}`}>홈</span>
                </button>
                <button className="flex flex-col items-center">
                    <Search
                        className={`h-5 w-5 mb-1 ${pathname === '/search' ? 'text-purple-600' : 'text-gray-500'}`}
                    />
                    <span className={`text-sm ${pathname === '/search' ? 'text-purple-600' : 'text-gray-500'}`}>
                        검색
                    </span>
                </button>
                <button className="flex flex-col items-center">
                    <Ticket
                        className={`h-5 w-5 mb-1 ${pathname === '/history' ? 'text-purple-600' : 'text-gray-500'}`}
                    />
                    <span className={`text-sm ${pathname === '/history' ? 'text-purple-600' : 'text-gray-500'}`}>
                        참여내역
                    </span>
                </button>
                <button className="flex flex-col items-center" onClick={() => router.push('/profile')}>
                    <User className={`h-5 w-5 mb-1 ${pathname === '/profile' ? 'text-purple-600' : 'text-gray-500'}`} />
                    <span className={`text-sm ${pathname === '/profile' ? 'text-purple-600' : 'text-gray-500'}`}>
                        내정보
                    </span>
                </button>
            </div>
        </div>
    );
}
