import { ErrorCode } from "../../common/enums/error-code.eums";
import { LoginDto, RegisterDto } from "../../common/interface/auth.interface";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import UserModel from "../../database/models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt";
import { config } from "../../config/app.config";
import jwt from "jsonwebtoken";

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, email, password } = registerData;

    const existingUser = await UserModel.exists({ email });
    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await UserModel.create({ name, email, password });

    return { user: newUser.toSafeObject()  };
  }

  public async login(loginData: LoginDto) {
    const { email, password } = loginData;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.AUTH_NOT_FOUND
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.AUTH_NOT_FOUND
      );
    }

    const accessToken = generateAccessToken({
      _id: String(user._id),
      email: user.email,
      name: user.name,
    });

    const refreshToken = generateRefreshToken({
      _id: String(user._id),
    });

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    return { user: user.toSafeObject() , accessToken, refreshToken };
  }

  public async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        config.JWT.REFRESH_TOKEN_SECRET as string
      ) as { _id: string };

      const user = await UserModel.findById(decoded._id);
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const accessToken = generateAccessToken({
        _id: String(user._id),
        email: user.email,
        name: user.name,
      });

      // Optional: Generate a new refresh token and update it in DB
      const newRefreshToken = generateRefreshToken({
        _id: String(user._id),
      });

      user.refreshToken = newRefreshToken;
      await user.save();

      return { accessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  public async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("Invalid email, Please check again");
    }

    // TODO: send reset email
  }

  public async logout(userId: string) {
    // Clear the refresh token from the database
    await UserModel.findByIdAndUpdate(userId, { refreshToken: null });
    return true;
  }
}
