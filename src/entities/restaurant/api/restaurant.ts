'use client';

import { createClient } from '@/src/shared/utils/supabase/client';

export const getRestaurants = async () => {
    try {
        const supabase = createClient();
        const { data, error } = await supabase.from('restaurant').select(`
                *,
                restaurant_image (
                    image_url
                )
            `);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        throw error;
    }
};
