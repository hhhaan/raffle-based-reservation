'use client';

import { Layout } from '@/src/widgets';
import { createClient } from '@/src/shared/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProfileScreen() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 사용자 정보 가져오기
        const fetchUserData = async () => {
            try {
                setLoading(true);

                // 현재 세션 정보 가져오기
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (!session) {
                    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
                    router.push('/auth');
                    return;
                }

                // 사용자 정보 가져오기
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (user) {
                    setUser(user);
                    console.log('로그인된 사용자 정보:', user);
                }
            } catch (error) {
                console.error('사용자 정보 가져오기 오류:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

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
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">프로필</h1>

                {user && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-start gap-6">
                            {/* 프로필 이미지 섹션 */}
                            {user.user_metadata?.avatar_url && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="프로필 이미지"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                                    />
                                </div>
                            )}

                            {/* 사용자 정보 섹션 */}
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold">
                                    {user.user_metadata?.name || user.user_metadata?.full_name || '사용자'}
                                </h2>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                            </div>
                        </div>

                        {/* 로그아웃 버튼 */}
                        <div className="mt-8">
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
