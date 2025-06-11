export interface RaffleResult {
    success: boolean;
    error?:
        | 'RAFFLE_NOT_FOUND'
        | 'RAFFLE_NOT_STARTED'
        | 'RAFFLE_ENDED'
        | 'ALREADY_ENTERED'
        | 'DATABASE_ERROR';
    message?: 'ENTRY_SUCCESS';
}

export type RaffleErrorCode = RaffleResult['error'];
