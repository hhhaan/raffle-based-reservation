import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    username: string;
    name: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    updateUser: (userData: Partial<User>) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            updateUser: (userData) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                })),
            logout: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
        }
    )
);
