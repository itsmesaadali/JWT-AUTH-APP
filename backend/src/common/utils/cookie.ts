import { CookieOptions, Response } from "express";
import { config } from "../../config/app.config";
import { calculateExpirationDate } from "./date-time";

type CookiePayloadType = {
    res: Response;
    accessToken:string;
}


const defaults: CookieOptions = {
    httpOnly:true,
    secure: config.NODE_ENV === 'production',
    sameSite: config.NODE_ENV === 'production' ? 'strict' : 'lax'
};


export const getAccessTokenCookieOptions = ():CookieOptions => {
    const expiresIn = config.JWT.ACCESS_TOKEN_EXPIRY;
    const expires = calculateExpirationDate(expiresIn);
    return {
        ...defaults,
        expires,
        path: '/',
    }
}

export const setAuthenticationCookies = ({
    res, accessToken 
}:CookiePayloadType): Response => 
    res
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())