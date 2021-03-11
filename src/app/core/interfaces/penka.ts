export interface Penka {
    id?: string;
    makerId?: string;
    makerName?: string;
    makerEmail?: string;
    makerPhoto?: string;
    name?: string;
    type?: string; /* singleMatches, templates, tournament */
    code?: string; /* code sharing */
    format?: string;
    public?: boolean;
    bet?: number;
    distributionBet?: string;
    prize?: number;
    currencyType?: string; /* USD, PEN */
    nParticipants?: number;
    limitParticipants?: number;
    status?: string; /* 1- in Game // 2- finished  //  3- archived  */
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
}
