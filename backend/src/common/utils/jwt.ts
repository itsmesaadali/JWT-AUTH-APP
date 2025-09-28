import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../../config/app.config";

interface AccessTokenPayload {
  _id: string;
  email: string;
  name: string;
}


export const generateAccessToken = (payload: AccessTokenPayload): string => {
  const options: SignOptions = {
    //@ts-ignore
    expiresIn: config.JWT.ACCESS_TOKEN_EXPIRY as string | number, // 👈 cast
  };

  return jwt.sign(payload, config.JWT.ACCESS_TOKEN_SECRET as string, options);
};

