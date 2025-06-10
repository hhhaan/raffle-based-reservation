'use client';
import { createClient } from '@/src/shared/utils/supabase/client';
import { RAFFLE_STATUS, RaffleStatusType } from '../constants';

export const getRaffles = async (offset = 0, status: RaffleStatusType) => {
    const supabase = createClient();

    let query = supabase.from('raffle').select(
        `id,
        restaurant_id,
        start_datetime,
        end_datetime,
        available_seats,
        restaurant (
            name,
            restaurant_image (
                image_url,
                is_primary
            )
        )
    `
    );

    const now = new Date().toISOString();

    if (status === RAFFLE_STATUS.ONGOING) {
        query = query.lte('start_datetime', now).gte('end_datetime', now);
    } else if (status === RAFFLE_STATUS.UPCOMING) {
        query = query.gt('start_datetime', now);
    } else if (status === RAFFLE_STATUS.ENDED) {
        query = query.lt('end_datetime', now);
    }

    const { data, error } = await query.range(offset, offset + 9);

    if (error) throw error;
    return data;
};

export const getParticipationStatus = async (userId: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('raffle_participant').select('raffle_id').eq('user_id', userId);

    if (error) throw error;

    return data.map((item) => item.raffle_id).filter(Boolean);
};
