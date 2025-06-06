'use client';
import { createClient } from '@/src/shared/utils/supabase/client';

export const getRaffles = async (offset = 0) => {
    const supabase = createClient();

    const { data: raffle, error } = await supabase
        .from('raffle')
        .select(
            `
            id,
            restaurant_id,
            start_datetime,
            end_datetime,
            available_seats,
            restaurant (
                name,
                restaurant_image!restaurant_image_restaurant_id_fkey (
                    image_url,
                    is_primary
                )
            )
        `
        )
        .range(offset, offset + 9); // 10개씩 가져오기 (0-9, 10-19, ...)

    if (error) throw error;
    return raffle;
};
