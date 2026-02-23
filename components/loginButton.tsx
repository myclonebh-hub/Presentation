"use client"

import { social_url } from "@/lib/social_login_url";
import { signOut, useSession } from "next-auth/react"

const signIn = (provider: string) => {
    let url = ""; // Declare once here

    switch (provider) {
        case 'google':
            url = social_url( // Just assign, don't use 'let'
                'https://accounts.google.com/o/oauth2/v2/auth',
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                process.env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/auth/callback/google',
                'code',
                'email profile'
            );
            break;

        case 'facebook':
            url = social_url( // Just assign, don't use 'let'
                'https://www.facebook.com/v25.0/dialog/oauth',
                process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
                process.env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/auth/callback/facebook',
                'code',
                'email public_profile'
            );
            break;
        case 'github':
            url = social_url( // Just assign, don't use 'let'
                'https://github.com/login/oauth/authorize',
                process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
                process.env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/auth/callback/github',
                'code',
                'read:user user:email'
            );
            break;
    }

    if (url) {
        console.log("Redirecting to: " + url);
        window.location.href = url;
    }
}

export default function LoginButton({ provider }: { provider: string }) {
    // const { data: session } = useSession()
    if (!provider || provider === "") return;
    // if (session) {
    //     console.log("session: ",session);
    //     return (
    //         <>
    //             <p>Welcome {session.user?.name}</p>
    //             <button onClick={() => signOut()}>Sign out</button>
    //         </>
    //     )
    // }

    return (
        <button onClick={() => signIn(provider)}>
            Sign in with {provider}
        </button>
    )
}