export const generateTTL = (tokenExp:number) => {
    const currentTime = Math.floor(Date.now() / 1000);

    const secondToExpire = tokenExp - currentTime;
    return secondToExpire > 0 ? secondToExpire : 0;
}

export const generateRedisKey = (userId:string) => {
    return "user-" + userId;
}