'use client';

import { Layout } from '@/src/widgets';
import { useUserStore } from '@/src/entities/user/model/store';
import Image from 'next/image';
export function ProfileScreen() {
    const { userInfo, signOut, loading } = useUserStore();

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen">
                    <p>로딩 중...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {userInfo?.avatarUrl ? (
                            <Image
                                src={userInfo.avatarUrl}
                                alt={userInfo.name}
                                className="w-full h-full object-cover"
                                width={50}
                                height={50}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{userInfo?.name}</h1>
                        <p className="text-gray-600 mb-2">{userInfo?.email}</p>
                        {userInfo?.phone && <p className="text-gray-600">{userInfo.phone}</p>}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8">
                    <button
                        onClick={signOut}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </Layout>
    );
}
