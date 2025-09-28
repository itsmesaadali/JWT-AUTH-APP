import { ErrorCode } from "../../common/enums/error-code.eums";
import { LoginDto, RegisterDto } from "../../common/interface/auth.interface";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/utils/catch-errors";
import UserModel from "../../database/models/user.model";
import {
  generateAccessToken,
} from "../../common/utils/jwt";
import { config } from "../../config/app.config";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export class AuthService {
  private googleClient: OAuth2Client;

  constructor() {
    this.googleClient = new OAuth2Client(config.GOOGLE.GOOGLE_CLIENT_ID);
  }

  public async register(registerData: RegisterDto) {
    const { name, email, password } = registerData;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      if (existingUser.authProvider === "google") {
        throw new BadRequestException(
          "This email is registered with Google. Please use Google Sign-In.",
          ErrorCode.AUTH_GOOGLE_ACCOUNT
        );
      }
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
      authProvider: "local",
    });

    return { user: newUser.toSafeObject() };
  }
// public async register(registerData: RegisterDto) {
//   const { name, email, password } = registerData;

//   const existingUser = await UserModel.findOne({ email });
//   if (existingUser) {
//     if (existingUser.authProvider === 'google') {
//       throw new BadRequestException(
//         "This email is registered with Google. Please use Google Sign-In.",
//         ErrorCode.AUTH_GOOGLE_ACCOUNT
//       );
//     }
//     throw new BadRequestException(
//       "User already exists with this email",
//       ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
//     );
//   }

//   const newUser = await UserModel.create({ name, email, password, authProvider: 'local' });

//   // Generate tokens (same as login)
//   const accessToken = generateAccessToken({
//     _id: String(newUser._id),
//     email: newUser.email,
//     name: newUser.name,
//   });

//   const refreshToken = generateRefreshToken({
//     _id: String(newUser._id),
//   });

//   // Save refresh token to database
//   newUser.refreshToken = refreshToken;
//   await newUser.save();

//   return { user: newUser.toSafeObject(), accessToken, refreshToken };
// }

  public async login(loginData: LoginDto) {
    const { email, password } = loginData;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.AUTH_NOT_FOUND
      );
    }

    // Check if user registered with Google
    if (user.authProvider === "google") {
      throw new BadRequestException(
        "This email is registered with Google. Please use Google Sign-In.",
        ErrorCode.AUTH_GOOGLE_ACCOUNT
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

    
    await user.save();

    return { user: user.toSafeObject(), accessToken };
  }

  public async googleAuth(token: string) {
    try {
      // Verify Google token
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new BadRequestException("Invalid Google token");
      }

      const { email, name, picture, sub: googleId } = payload;

      // Check if user exists
      let user = await UserModel.findOne({
        $or: [{ email }, { googleId }],
      });

      if (user) {
        // User exists - check if it's a local account
        if (user.authProvider === "local") {
          throw new BadRequestException(
            "This email is already registered with email/password. Please login with your password.",
            ErrorCode.AUTH_LOCAL_ACCOUNT
          );
        }

        // Update Google user info if needed
        if (!user.avatar && picture) {
          user.avatar = picture;
          await user.save();
        }
      } else {
        // Create new Google user
        user = await UserModel.create({
          name: name || email.split("@")[0],
          email,
          avatar: picture,
          authProvider: "google",
          googleId,
          // No password field for Google users
        });
      }

      // Generate tokens
      const accessToken = generateAccessToken({
        _id: String(user._id),
        email: user.email,
        name: user.name,
      });


      await user.save();

      return { user: user.toSafeObject(), accessToken};
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException("Google authentication failed");
    }
  }


  public async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email, authProvider: "local" });
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