// @ts-nocheck
import { Request, Response } from "express";

export const validateAuthMiddleware = (req:Request, res:Response) => { 
    const [access, refresh] = req.headers.authorization?.split(',')
    const accessToken = access && access.split('=')[1];
    const refreshToken = refresh.split('=')[1];
    
    console.log(accessToken, refreshToken)
     
    return res.json({success:true})
}