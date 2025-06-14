'use client';

import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createClient } from '@/src/shared/utils/supabase/client';

interface UserInfo {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
    phone: string;
}

interface UserState {
    user: User | null;
    userInfo: UserInfo | null;
    error: Error | null;
    loading: boolean;
    isLoggedIn: () => Promise<boolean>;
    redirectToLogin: () => void;
    signInWithKakao: (redirectUrl: string) => Promise<string | null>;
    setUser: (user: User | null) => void;
    signOut: () => Promise<void>;
    getUser: () => Promise<void>;
}

const extractUserInfo = (user: User | null): UserInfo | null => {
    if (!user) return null;
    return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || user.user_metadata?.full_name || '사용자',
        avatarUrl: user.user_metadata?.avatar_url || '',
        phone: user.user_metadata?.phone || '',
    };
};

export const useUserStore = create<UserState>()(
    persist(
        set => ({
            user: null,
            userInfo: null,
            error: null,
            loading: false,
            isLoggedIn: async () => {
                const supabase = createClient();
                const {
                    data: { session },
                } = await supabase.auth.getSession();
                return session !== null;
            },
            redirectToLogin: () => {
                // 현재 URL을 저장하여 로그인 후 돌아올 수 있게 함
                const currentUrl = window.location.pathname + window.location.search;
                // URL을 인코딩하여 쿼리 파라미터에 추가
                // const redirectUrl = `/login?redirect=${encodeURIComponent(currentUrl)}`;
                const redirectUrl = `/login?next=${encodeURIComponent(currentUrl)}`;
                window.location.href = redirectUrl;
            },
            signInWithKakao: async (redirectUrl: string) => {
                set({ loading: true });
                try {
                    const supabase = createClient();
                    // redirectUrl에 next 파라미터 추가
                    const currentUrl = window.location.pathname + window.location.search;
                    const callbackUrl = `${redirectUrl}?next=${encodeURIComponent(currentUrl)}`;

                    const { data, error } = await supabase.auth.signInWithOAuth({
                        provider: 'kakao',
                        options: {
                            redirectTo: callbackUrl,
                        },
                    });
                    if (error) throw error;
                    return data.url;
                } catch (error) {
                    console.error('Kakao login error:', error);
                    set({ error: error as Error });
                    return null;
                } finally {
                    set({ loading: false });
                }
            },
            // 로그아웃 처리
            signOut: async () => {
                try {
                    set({ loading: true, error: null });
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    set({ user: null, userInfo: null, loading: false });
                    window.location.href = '/';
                } catch (error) {
                    console.error('로그아웃 오류:', error);
                    set({ error: error as Error, loading: false });
                }
            },

            getUser: async () => {
                try {
                    set({ loading: true });
                    const supabase = createClient();
                    const { data, error } = await supabase.auth.getUser();

                    if (error) throw error;
                    const userInfo = extractUserInfo(data.user);
                    set({ user: data.user, userInfo, loading: false, error: null });
                } catch (error) {
                    set({ user: null, userInfo: null, loading: false, error: error as Error });
                }
            },

            // 사용자 정보 설정 (로그인 성공 시 호출)
            setUser: (user: User | null) => {
                const userInfo = extractUserInfo(user);
                set({ user, userInfo, loading: false, error: null });
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => {
                if (typeof window !== 'undefined') {
                    return localStorage;
                }
                return {
                    getItem: () => null,
                    setItem: () => {},
                    removeItem: () => {},
                };
            }),
            partialize: state => ({
                userInfo: state.userInfo,
            }),
        }
    )
);
