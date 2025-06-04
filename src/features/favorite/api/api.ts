'use client';

import { createClient } from '@/src/shared/utils/supabase/client';

export const getUserFavorites = async (userId: string) => {
    try {
        const supabase = createClient();
        const { data, error } = await supabase.from('favorites').select('restaurant_id').eq('user_id', userId);
        if (error) throw error;
        return data.map((item) => item.restaurant_id || []);
    } catch (error) {
        console.error('Failed to fetch user favorites:', error);
        throw error;
    }
};
