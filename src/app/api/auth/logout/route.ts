import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/user';
import { deleteTokenCookie, getTokenFromCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const refreshToken = await getTokenFromCookie('refreshToken');
    
    if (refreshToken) {
      // Remove refresh token from database
      await User.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
    }

    // Clear cookies
    deleteTokenCookie('accessToken');
    deleteTokenCookie('refreshToken');
    
    return NextResponse.json({ message: 'Logout successful' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}