import jwt from "jsonwebtoken";
import { generateRedisKey, generateTTL } from "../utils/helpers";
import { setCache } from "../redis/action";
import { encryptData } from "../encryption";

export const generateToken = (
  id: string,
  email: string,
  tokenType: "access" | "refresh"
) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY!, {
    expiresIn: tokenType === "access" ? "7min" : "7d",
  });

  return token;
};

export const saveRefreshToken = async (token: string, encryptedToken:string) => {
  try {
    const decodeData = jwt.decode(token, { json: true });
    if (!decodeData) throw new Error("Unable to decode token");
    const key = generateRedisKey(decodeData.id);
    const TTL = generateTTL(decodeData.exp!);
    await setCache(key, encryptedToken, TTL);
    console.log("Save refresh Token");
  } catch (error) {
    console.log('Error is save refresh Token', error);
    throw error;
  }
};


export const verifyAndDecode = (token:string) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY!, (error,payload)=> {
      if(error) {
        console.log('Could not verify the token')
        rej(error)
      }else
      {
        console.log('Verify token successfully')
        res(payload)
      }
    })
  })
}