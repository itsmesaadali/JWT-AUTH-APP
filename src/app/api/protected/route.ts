import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { getTokenFromCookie } from '@/lib/auth';
import {verifyAccessToken }from '@/utils/verifyToken'
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
    
    return NextResponse.json({ 
      message: 'This is protected data!',
      userId: decoded.userId
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 403 }
    );
  }
}