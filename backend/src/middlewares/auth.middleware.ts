// @ts-nocheck
import { Request, Response } from "express";
import { validateAccessToken, validateRefreshToken } from "../utils/helpers";
import { generateToken, saveRefreshToken } from "../token/token.manager";
import { encryptData } from "../encryption";
import { setCookies } from "../handlers/user.handler";

export const validateAuthMiddleware = (req: Request, res: Response) => {
  const [access, refresh] = req.headers.authorization?.split(" ,");
  const accessToken = access && access.split("=")[1];
  const refreshToken = refresh.split("=")[1];

  const isAccessTokenValid = await validateAccessToken(accessToken);
  const decodedRefreshToken = await validateRefreshToken(refreshToken);

  if (isAccessTokenValid && decodedRefreshToken) {
    console.log("Access token, refresh token are valid");
    return res.status(200).json({ message: "Authorized", success: true });
  } else if (!isAccessTokenValid && decodedRefreshToken) {
    const newAccessToken = generateToken(
      decodedRefreshToken!.id!,
      decodedRefreshToken.email!,
      "access"
    );

    const newRefreshToken = generateToken(
      decodedRefreshToken!.id!,
      decodedRefreshToken.email!,
      "refresh"
    );

    const newEncryptedRefreshToken = encryptData(newRefreshToken);
    await saveRefreshToken(newRefreshToken, newEncryptedRefreshToken);

    setCookies(newAccessToken, newEncryptedRefreshToken, res);

    return res.status(200).json({ message: "Authorized", success: true });
  } else {
    res.status(404).json({ message: "not authorized", success: true });
  }

};
