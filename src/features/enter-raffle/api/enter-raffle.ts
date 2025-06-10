import { createClient } from '@/src/shared/utils/supabase/client';
import { RaffleResult } from '../types';

export const enterRaffle = async ({
    raffleId,
    userId,
}: {
    raffleId: number;
    userId: string;
}): Promise<RaffleResult> => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('enter_raffle', {
        p_user_id: userId,
        p_raffle_id: raffleId,
    });
    if (error) throw error;
    return data as unknown as RaffleResult;
};
