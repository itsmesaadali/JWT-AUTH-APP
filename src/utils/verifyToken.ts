import jwt from "jsonwebtoken";
import { JwtPayload } from "./generateToken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET is not defined");
if (!REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET is not defined");

export const verifyAccessToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, ACCESS_SECRET);
  if (typeof decoded === "string" || !("userId" in decoded)) {
    throw new Error("Invalid access token");
  }
  return decoded as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, REFRESH_SECRET);
  if (typeof decoded === "string" || !("userId" in decoded)) {
    throw new Error("Invalid refresh token");
  }
  return decoded as JwtPayload;
};
