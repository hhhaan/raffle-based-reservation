'use client';
import { createClient } from '@/src/shared/utils/supabase/client';

export const getRaffles = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('raffle')
        .select(
            `
            id,
            status,
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
        .order('start_datetime', { ascending: false });

    if (error) {
        console.error('Raffles 조회 오류:', error);
        throw error;
    }

    return (
        data?.map((raffle) => ({
            ...raffle,
            start_datetime: raffle.start_datetime ? new Date(raffle.start_datetime) : null,
            end_datetime: raffle.end_datetime ? new Date(raffle.end_datetime) : null,
            restaurant: {
                ...raffle.restaurant,
                primary_image: raffle.restaurant?.restaurant_image?.find((img) => img.is_primary)?.image_url || null,
            },
        })) || []
    );
};
