import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/user';
import {  getTokenFromCookie } from '@/lib/auth';
import { verifyAccessToken } from '@/utils/verifyToken';
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const accessToken = await getTokenFromCookie('accessToken');
    
    if (!accessToken) {
      return NextResponse.json(
        { message: 'Access token required' },
        { status: 401 }
      );
    }

    // Verify access token
    const decoded = verifyAccessToken(accessToken);
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password -refreshToken');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 403 }
    );
  }
}