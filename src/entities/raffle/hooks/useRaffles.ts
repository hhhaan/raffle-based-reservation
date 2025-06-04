import { useQuery } from '@tanstack/react-query';
import { getRaffles } from '../api/raffle';

export const useRaffles = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['raffles'],
        queryFn: () => getRaffles(),
    });

    return {
        data,
        isLoading,
        error,
    };
};
