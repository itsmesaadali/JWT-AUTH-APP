import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateAuth } from "./app/lib/validateAuth";

export const middleware = async( req:NextRequest) => {
     const cookieStore = await cookies();
     if(!cookieStore.get('access_token') || !cookieStore.get('refresh_token')) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.rewrite(url)
     }

     const authData = await validateAuth();

     if(!authData || !authData.success) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.rewrite(url)
     }

     return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher:'/profile'
}