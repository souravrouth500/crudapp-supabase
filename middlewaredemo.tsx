'use client'
import React from "react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const protectedRoutes = ["/profile"];


export default function middleware(req: NextRequest) {

  const [accessToken, setAccessToken] = React.useState<String | null>(null)
  if (!accessToken && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL);
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    setAccessToken(token)
  }, [accessToken])
}