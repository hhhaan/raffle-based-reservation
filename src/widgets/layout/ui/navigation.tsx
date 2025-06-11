'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Bookmark, Home, Ticket, User } from 'lucide-react';

export const Navigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    // URL 경로에 따라 활성 탭 결정
    const getActiveTab = (path: string) => {
        if (path === '/') return 'home';
        if (path === '/raffles') return 'raffles';
        if (path === '/profile/favorites') return 'favorites';
        if (path === '/profile') return 'profile';
        return 'home';
    };

    const activeTab = getActiveTab(pathname);

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-transparent pointer-events-none">
            <nav className="w-full max-w-md bg-white border-t border-gray-200 px-2 pt-2 py-4 pointer-events-auto">
                <div className="flex justify-around">
                    <button
                        className={`flex flex-col items-center p-2 ${
                            activeTab === 'home' ? 'text-indigo-600' : 'text-gray-600'
                        }`}
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        <Home size={20} />
                        <span className="text-xs mt-1">홈</span>
                    </button>

                    <button
                        className={`flex flex-col items-center p-2 ${
                            activeTab === 'raffles' ? 'text-indigo-600' : 'text-gray-600'
                        }`}
                        onClick={() => {
                            router.push('/raffles');
                        }}
                    >
                        <Ticket size={20} />
                        <span className="text-xs mt-1">인기 래플</span>
                    </button>

                    <button
                        className={`flex flex-col items-center p-2 ${
                            activeTab === 'favorites' ? 'text-indigo-600' : 'text-gray-600'
                        }`}
                        onClick={() => {
                            router.push('/profile/favorites');
                        }}
                    >
                        <Bookmark size={20} />
                        <span className="text-xs mt-1">즐겨찾기</span>
                    </button>

                    <button
                        className={`flex flex-col items-center p-2 ${
                            activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-600'
                        }`}
                        onClick={() => {
                            router.push('/profile');
                        }}
                    >
                        <User size={20} />
                        <span className="text-xs mt-1">내 정보</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};
