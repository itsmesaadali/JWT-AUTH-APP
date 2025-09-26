import { CookieOptions, Response } from "express";
import { config } from "../../config/app.config";
import { calculateExpirationDate } from "./date-time";

type CookiePayloadType = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const defaults: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production", // HTTPS only in prod
  sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  domain: config.NODE_ENV === "production" ? ".vercel.app" : undefined, 
  // 👆 share across subdomains in prod, work on localhost in dev
};

export const getAccessTokenCookieOptions = (): CookieOptions => {
  const expiresIn = config.JWT.ACCESS_TOKEN_EXPIRY; // e.g. "15m"
  const expires = calculateExpirationDate(expiresIn);
  return {
    ...defaults,
    expires,
    path: "/", // 👈 must be global
  };
};

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  const expiresIn = config.JWT.REFRESH_TOKEN_EXPIRY; // e.g. "7d"
  const expires = calculateExpirationDate(expiresIn);
  return {
    ...defaults,
    expires,
    path: "/", // 👈 FIX: was /api/v1/auth/refresh (too restrictive)
  };
};

export const setAuthenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}: CookiePayloadType): Response =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

/**
 * Clear cookies on logout
 */
export const clearAuthCookies = (res: Response): Response =>
  res
    .clearCookie("accessToken", { ...getAccessTokenCookieOptions(), maxAge: 0 })
    .clearCookie("refreshToken", { ...getRefreshTokenCookieOptions(), maxAge: 0 });
