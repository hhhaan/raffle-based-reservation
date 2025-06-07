'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { createClient } from '@/src/shared/utils/supabase/client';
import { debounce } from 'lodash';

// 타입 정의
interface RaffleResult {
    success: boolean;
    error?: 'RAFFLE_NOT_FOUND' | 'RAFFLE_NOT_STARTED' | 'RAFFLE_ENDED' | 'ALREADY_ENTERED' | 'DATABASE_ERROR';
    message?: 'ENTRY_SUCCESS';
}

type RaffleErrorCode = RaffleResult['error'];

const participateRaffle = async ({ raffleId, userId }: { raffleId: number; userId: string }): Promise<RaffleResult> => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('enter_raffle', {
        p_user_id: userId,
        p_raffle_id: raffleId,
    });
    if (error) throw error;
    return data as unknown as RaffleResult;
};

// 에러 메시지 매핑
const getErrorMessage = (errorCode?: RaffleErrorCode): string => {
    switch (errorCode) {
        case 'RAFFLE_NOT_FOUND':
            return '래플을 찾을 수 없습니다.';
        case 'RAFFLE_NOT_STARTED':
            return '아직 래플이 시작되지 않았습니다.';
        case 'RAFFLE_ENDED':
            return '래플이 종료되었습니다.';
        case 'ALREADY_ENTERED':
            return '이미 응모하셨습니다.';
        case 'DATABASE_ERROR':
            return '서버 오류가 발생했습니다.';
        default:
            return '응모 중 오류가 발생했습니다.';
    }
};

export const useRaffleParticipate = ({
    onSuccess,
    onError,
}: {
    onSuccess?: (raffleId: number) => void;
    onError?: (error: { message: string; code?: RaffleErrorCode; raffleId: number }) => void;
} = {}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleParticipate = useCallback(
        async (raffleId: number, userId: string) => {
            if (isSubmitting) return;

            setIsSubmitting(true);
            setError(null);

            try {
                const result = await participateRaffle({
                    raffleId,
                    userId,
                });

                if (result.success) {
                    onSuccess?.(raffleId);
                } else {
                    const errorMessage = getErrorMessage(result.error);
                    setError(errorMessage);
                    onError?.({ message: errorMessage, code: result.error, raffleId });
                }
            } catch (error: any) {
                const errorMessage = error?.message || '응모 중 오류가 발생했습니다.';
                setError(errorMessage);
                onError?.({ message: errorMessage, raffleId });
            } finally {
                setIsSubmitting(false);
            }
        },
        [onSuccess, isSubmitting, onError]
    );

    const debouncedParticipate = useMemo(
        () => debounce((raffleId: number, userId: string) => handleParticipate(raffleId, userId), 300),
        [handleParticipate]
    );

    // debounce cleanup
    useEffect(() => {
        return () => {
            debouncedParticipate.cancel();
        };
    }, [debouncedParticipate]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        participate: debouncedParticipate,
        isSubmitting,
        error,
        clearError,
    };
};
