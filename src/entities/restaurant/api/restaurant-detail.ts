'use client';

import { createClient } from '@/src/shared/utils/supabase/client';

export const getRestaurantDetail = async (id: number) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('restaurant')
        .select(
            `
            *,
           restaurant_image (
               image_url,
               is_primary
           )
       `
        )
        .eq('id', id)
        .single();

    if (error) throw error;

    return {
        ...data,
    };
};
