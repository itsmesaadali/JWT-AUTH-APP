import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/models/user";
import { generateAccessToken } from "@/utils/generateToken";
import { verifyRefreshToken } from "@/utils/verifyToken";
import { setTokenCookie, getTokenFromCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const refreshToken = await getTokenFromCookie("refreshToken");

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token required" },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user with this refresh token
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id.toString());

    // Set new access token cookie
    setTokenCookie("accessToken", accessToken, 15 * 60); // 15 minutes

    return NextResponse.json({ message: "Token refreshed successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid or expired refresh token" },
      { status: 403 }
    );
  }
}
