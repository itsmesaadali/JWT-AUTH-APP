import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import { emailSchema, loginSchema, registerSchema } from "../../common/validators/auth.validator";
import {
  getAccessTokenCookieOptions,
  setAuthenticationCookies,
} from "../../common/utils/cookie";
import { BadRequestException, UnauthorizedException } from "../../common/utils/catch-errors";
import { clearAuthenticationCookies } from "../../common/utils/date-time";

// Create a custom interface that extends Request
interface AuthenticatedRequest extends Request {
  user?: any; // Use 'any' temporarily or import UserDocument type
}

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(async (req: Request, res: Response) => {
    const body = registerSchema.parse({ ...req.body });
    const { user } = await this.authService.register(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
      user,
    });
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await this.authService.login(body);

    return setAuthenticationCookies({ res, accessToken, refreshToken })
      .status(HTTPSTATUS.OK)
      .json({
        message: "User login successfully",
        user,
      });
  });


   public googleAuth = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;
    
    if (!token) {
      throw new BadRequestException("Google token is required");
    }

    const { user, accessToken, refreshToken } = await this.authService.googleAuth(token);

    return setAuthenticationCookies({ res, accessToken, refreshToken })
      .status(HTTPSTATUS.OK)
      .json({
        message: "Google authentication successful",
        user,
      });
  });

  public refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new UnauthorizedException("User not authorized");
    }

    const { accessToken } = await this.authService.refreshToken(refreshToken);

    return res
      .status(HTTPSTATUS.OK)
      .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
      .json({
        message: "Refresh access token successfully",
      });
  });

  public forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const email = emailSchema.parse(req.body.email);
    await this.authService.forgotPassword(email);

    return res.status(HTTPSTATUS.OK).json({
      message: "Password reset email sent",
    });
  });

  // Use the AuthenticatedRequest type for logout
  public logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new UnauthorizedException("User not authenticated");
    }
    await this.authService.logout(userId.toString());

    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: "User logout successfully",
    });
  });
}