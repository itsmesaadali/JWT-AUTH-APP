import { NextFunction, Request, Response } from "express";
import { validateRefreshToken } from "../utils/helpers";

export const validateAuthTokens = async(req:Request, res:Response, next:NextFunction) => {
    // @ts-ignore
      const [_, refresh] = req.headers.authorization?.split(" ,");
  const refreshToken = refresh.split("=")[1];

  const decryptedRefreshToken = await validateRefreshToken(refreshToken)

  if(!decryptedRefreshToken) {
    return res.status(404).json({message:'Not authorized'})
  }

  res.locals.jwtData = decryptedRefreshToken;
  next();
}