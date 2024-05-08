//get ms from 12 am that day
export function UTCToTime(UTCms: number){
    return UTCms%86400000;
}

//finds midnight of that day
export function UTCMidnight(UTCms: number){
    return UTCms - UTCToTime(UTCms);
}

export function isSameUTCDay(firstUTC: number, secondUTC: number){
    return UTCMidnight(firstUTC) === UTCMidnight(secondUTC);
}

export const daysOfWeek : string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];