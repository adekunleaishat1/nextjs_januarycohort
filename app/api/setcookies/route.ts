import { NextResponse } from "next/server";


export async function POST (req:Request) {
    const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ success: false, message: "Token is required" }, { status: 400 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
  
  return response;
}