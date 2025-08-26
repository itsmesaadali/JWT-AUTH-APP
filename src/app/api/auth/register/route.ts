import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import UserModel from '@/models/user';
import { generateAccessToken, generateRefreshToken } from "@/utils/generateToken";
import { setTokenCookie } from "@/lib/auth";




export async function POST(requset:NextRequest) {
    try {
        await connectDB();

        const { username, email, password} = await requset.json();

        const existingUser = await UserModel.findOne({
            email
        });

        if(existingUser) {
            return NextResponse.json(
                { message:'User already exists with this email'},
                {status:400}
            )
        }

        const user = await UserModel.create({
            username, 
            email,
            password
        })
        const accessToken = generateAccessToken(user._id.toString());
const refreshToken = generateRefreshToken(user._id.toString());



        user.refreshToken = refreshToken;
        await user.save()

        setTokenCookie('accessToken', accessToken, 15*60);
        setTokenCookie('refreshToken', refreshToken, 7*24*60*60);

        return NextResponse.json(
            {
                message:'User created successfully',
                user: {
                    id:user._id,
                    username:user.username,
                    email:user.email
                }
            },
            {status:201}
        )
    } catch (error:any) {
        return NextResponse.json(
            {message:error.message || 'Server error'},
            {status:5000}
        )
    }
}