// File: middleware.ts
import {NextRequest, NextResponse} from 'next/server'
import {ACCESS_TOKEN} from "@/services/axiosClient";

// 1. Specify protected and public routes
const publicRoutes = ['/auth/sign-in', '/auth/sign-up']


export async function middleware(req: NextRequest) {
    console.log('Middleware:', req)

    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    // Get token from cookies directly using NextRequest
    const token = req.cookies.get(ACCESS_TOKEN)?.value


    if (isPublicRoute && token) {
        console.log('User already logged in, redirecting to dashboard')
        return NextResponse.redirect(new URL('/', req.url))
    }

    // Redirect to sign-in if route is protected and no token exists
    if (!isPublicRoute && !token) {
        console.log('Redirecting to sign-in page')
        return NextResponse.redirect(new URL('/auth/sign-in', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|_next/data|favicon.ico|manifest.json|.*\\.png$|sw\\.js$|workbox-.*\\.js$).*)'],
}