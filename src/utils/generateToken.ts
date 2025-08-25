import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
}

// Ensure secrets are defined
const ACCESS_SECRET: jwt.Secret = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET: jwt.Secret = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign({ userId }, ACCESS_SECRET, options);
};

export const generateRefreshToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign({ userId }, REFRESH_SECRET, options);
};
