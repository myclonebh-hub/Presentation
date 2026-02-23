"use client"
import LoginButton from "@/components/loginButton";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";

export default function page() {
    const { data: session } = useSession();
    useEffect(() => {
        const fetchSession = async () => {
            const data = await getSession();
            console.log("data: ", data);
        }
        fetchSession();
    }, [])
    console.log(session);
    if (session) {
        console.log(session);
        return (
            <>
                <div>{session.user?.email}</div>
                <img src={`${session.user?.image}`} alt="dfd" />
                <div>{session.user?.name}</div>
            </>
        )
    }
    return (
        <>
            <div style={
                {
                    display: "flex",
                    flexDirection: "column"
                }
            }>
                <div>Login</div>
                <LoginButton provider="google" />
                <LoginButton provider="facebook" />
                <LoginButton provider="github"/>
            </div>
        </>
    )
}