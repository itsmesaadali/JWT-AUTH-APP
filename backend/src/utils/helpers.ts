import { decryptData } from "../encryption";
import { getCache } from "../redis/action";
import { verifyAndDecode } from "../token/token.manager";

type TokenInfo = {
    id:string;
    email:string;
    exp:number;
    iat:number;
}

export const generateTTL = (tokenExp:number) => {
    const currentTime = Math.floor(Date.now() / 1000);

    const secondToExpire = tokenExp - currentTime;
    return secondToExpire > 0 ? secondToExpire : 0;
}

export const generateRedisKey = (userId:string) => {
    return "user-" + userId;
}

export const validateAccessToken = async(token:string) => {
    try {
        const decryptedData = await verifyAndDecode(token)
        if(decryptedData) {
            return true
        }
        else
        {
            return false;
        }
    } catch (error) {
        console.log('unable the accessToken', error)
        return false
    }
}


export const validateRefreshToken = async(token:string) => {
    try {
        const jwtToken = decryptData(token)
        const decodedJwtData = await verifyAndDecode(jwtToken) as TokenInfo | null;

        if(!decodedJwtData) {
            console.log('user token not valid');
            return false;
        }

        const encryptedTokenFromCache = await getCache(
            generateRedisKey(decodedJwtData.id)
        )
        // @ts-ignore
        if(!encryptedTokenFromCache) {
            console.log('Token not found in memory')
            return false;
        }

        const decryptedTokenFronCache = decryptData(encryptedTokenFromCache);
        // @ts-ignore
        const decodeJwtDataFromCache = verifyAndDecode(decryptedTokenFronCache) as TokenInfo | null;

        if(token === encryptedTokenFromCache && decryptedTokenFronCache !== jwtToken) {
            console.log('Token maifunctioned')
            return false
        }

        const ttl = generateTTL(decodeJwtDataFromCache!.exp)

        if(ttl <=0) {
            console.log('token is exp in memory')
            return false;
        }

        return {...decodeJwtDataFromCache}


    } catch (error) {
        console.log('unexpected error during valdation token', error)
        return false 
    }
}