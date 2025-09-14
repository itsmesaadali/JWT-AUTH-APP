import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { UserService } from "./user.service";
import { HTTPSTATUS } from "../../config/http.config";
import { UnauthorizedException } from "../../common/utils/catch-errors";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getCurrentUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new UnauthorizedException("User not authenticated");
    }

    const user = await this.userService.getUserById(userId.toString());
    
    return res.status(HTTPSTATUS.OK).json({
      message: "User data retrieved successfully",
      user,
    });
  });

  public getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.params.id;
    const user = await this.userService.getUserById(userId);
    
    return res.status(HTTPSTATUS.OK).json({
      message: "User profile retrieved successfully",
      user,
    });
  });

  public updateUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new UnauthorizedException("User not authenticated");
    }

    const updateData = req.body;
    const user = await this.userService.updateUser(userId.toString(), updateData);
    
    return res.status(HTTPSTATUS.OK).json({
      message: "User profile updated successfully",
      user,
    });
  });
}