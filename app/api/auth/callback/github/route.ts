import { NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET(request: Request) {
    // console.log("request: ",request.url);
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const code = searchParams.get("code");
    console.log(code);
    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", // This tells GitHub: "Give me JSON, please!"
        },
        body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.NEXT_PUBLIC_NEXTAUTH_URL +"/api/auth/callback/github",
        }),
    });

    const data = await response.json();
    const vipPass = data.access_token;

    // This 'data' object now contains your VIP Pass!
    console.log("Your VIP Pass:", data);
    console.log("Your VIP Pass (Access Token):", data.access_token);
    const userResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `token ${vipPass}`, // GitHub accepts 'token' or 'Bearer'
        },
    });

    const githubProfile = await userResponse.json();
    console.log("GitHub ID (Provider ID):", githubProfile);
    return NextResponse.json({ Message: searchParams });
}