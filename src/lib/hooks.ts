import {useDebugValue, useEffect, useState} from "react";
import {redirect} from "next/navigation";

export function useLoginCode(): [string, CallableFunction, CallableFunction] {
    const [code, setCode] = useState<string>("")

    // this might be the most cursed thing I've done yet
    const logout = () => useEffect(() => {
        localStorage.removeItem("authCode")
        // @ts-ignore fuck you I like my nulls
        setCode(null)
        redirect("/login")
    }, [code])

    useEffect(() => {
        let savedCode = localStorage.getItem("authCode")
        savedCode = savedCode ? savedCode : ""

        if (!savedCode && code) { localStorage.setItem("authCode", code); return }
        if (!savedCode && !code && window.location.pathname !== "/login") { redirect("/login"); return }
        if (savedCode && !code) { setCode(savedCode); return }
    }, [code]);

    useDebugValue(code ?? "loading..")

    return [code, setCode, logout]
}

