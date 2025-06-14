'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/src/entities/user/model/store';
import { createClient } from '@/src/shared/utils/supabase/client';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const getUser = useUserStore(state => state.getUser);
    const setUser = useUserStore(state => state.setUser);

    useEffect(() => {
        // 초기 사용자 로드
        getUser();

        const supabase = createClient();
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [getUser, setUser]);

    return <>{children}</>;
}
