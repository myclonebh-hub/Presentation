import { NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET(request: Request) {
  // console.log("request: ",request.url);
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const code = searchParams.get("code");
  console.log(code);
  const body: Record<string, string> = {
    code: code!,                 // The 'receipt' you got from the URL
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,      // Your App's Public ID
    client_secret: process.env.GOOGLE_CLIENT_SECRET!, // Your App's Private Key (Secret!)
    redirect_uri: process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/auth/callback/google",
    grant_type: "authorization_code",
  }
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });

  const data = await response.json();

  // This 'data' object now contains your VIP Pass!
  console.log("Your VIP Pass:", data);
  console.log("Your VIP Pass (Access Token):", data.access_token);
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${data.access_token}`, // Showing your VIP pass to the guard
    },
  });

  const userProfile = await userResponse.json();
  console.log("userProfile: ",userProfile);
  return NextResponse.json({ Message: searchParams });
}