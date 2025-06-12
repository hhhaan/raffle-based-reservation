export const RAFFLE_STATUS = {
    ALL: 'ALL',
    ONGOING: 'ONGOING',
    UPCOMING: 'UPCOMING',
    ENDED: 'ENDED',
} as const;

export type RaffleStatusType = (typeof RAFFLE_STATUS)[keyof typeof RAFFLE_STATUS];
