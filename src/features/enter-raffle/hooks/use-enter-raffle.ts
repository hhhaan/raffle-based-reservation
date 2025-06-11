'use client';

import { useUserStore } from '@/src/entities/user/model/store';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { enterRaffle } from '../api';
import { RaffleErrorCode } from '../types';
import { useState } from 'react';

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

export const useEnterRaffle = () => {
    const userId = useUserStore((state) => state.user?.id);
    const redirectToLogin = useUserStore((state) => state.redirectToLogin);
    const queryClient = useQueryClient();
    const [isProcessing, setIsProcessing] = useState(false);

    const mutation = useMutation({
        mutationFn: enterRaffle,
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['participation-status'] });
            }
        },
    });

    const participate = async (raffleId: number) => {
        // 이미 처리 중이면 중복 실행 방지
        if (mutation.isPending || isProcessing) return;
        if (!userId) {
            redirectToLogin();
            return;
        }
        setIsProcessing(true);

        // toast.promise로 1초 지연과 함께 처리
        const toastPromise = new Promise<any>((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const result = await mutation.mutateAsync({ raffleId, userId });

                    if (result.success) {
                        resolve(result);
                    } else {
                        reject(new Error(getErrorMessage(result.error)));
                    }
                } catch (error) {
                    reject(error);
                } finally {
                    setIsProcessing(false);
                }
            }, 1000);
        });

        toast.promise(toastPromise, {
            loading: '래플 응모 중...',
            success: '래플 응모 성공!',
            error: (error) => error?.message || '응모 중 오류가 발생했습니다.',
        });
    };

    return {
        participate,
        isSubmitting: mutation.isPending || isProcessing,
        error: mutation.error,
        isError: mutation.isError,
        reset: () => {
            mutation.reset();
            setIsProcessing(false);
        },
    };
};
