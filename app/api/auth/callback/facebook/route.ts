import { NextResponse } from "next/server"
// import { google } from "googleapis"

export async function GET(request: Request) {
    // console.log("request: ",request.url);
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const code = searchParams.get("code");
    console.log(code);
    // 1. Create the search params object
    const body: Record<string, string> = {
        client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_NEXTAUTH_URL +"/api/auth/callback/facebook",
        code: code!,
    }
    const params = new URLSearchParams(body);

    // 2. Attach them to the URL
    const url = `https://graph.facebook.com/v18.0/oauth/access_token?${params.toString()}`;

    // 3. Make the fetch call
    const response = await fetch(url, {
        method: "GET",
    });

    const data = await response.json();
    console.log("VIP Pass (Access Token):", );
    // This 'data' object now contains your VIP Pass!
    console.log("Your VIP Pass:", data);
    const access_token = data.access_token;

    const userResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`
    );

    const userProfile = await userResponse.json();
    console.log("userProfile: ", userProfile);
    return NextResponse.json({ Message: searchParams });
}