import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../common/utils/catch-errors";
import { asyncHandler } from "../common/utils/asyncHandler";
import UserModel from "../database/models/user.model";
import { config } from "../config/app.config";
import { UserDocument } from "../database/models/user.model";

interface JwtPayload {
  _id: string;
  email?: string;
  name?: string;
}

// Create a custom interface that extends Request
interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export const verifyJWT = asyncHandler(
  async (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new UnauthorizedException("Unauthorized request");
      }

      // Verify token
      const decoded = jwt.verify(
        token,
        config.JWT.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      // Find user
      const user = await UserModel.findById(decoded._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new UnauthorizedException("Invalid Access Token");
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error: any) {
      throw new UnauthorizedException(error?.message || "Invalid access token");
    }
  }
);