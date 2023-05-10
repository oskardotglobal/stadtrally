"use client";

import {useEffect, useState} from "react";
import {getSavedCode, saveCode} from "@/lib/storage";
import {redirect} from "next/navigation";

export default function Home() {
    const [code, setCode] = useState<string>("")

    useEffect(() => {
        if (!code) setCode(getSavedCode(localStorage))
        if (!getSavedCode(localStorage) && !code) redirect("/login")
        if (!getSavedCode(localStorage) && code) saveCode(code, localStorage)
    }, [code]);

    return (
        <div>
            <p>Logged in</p>
        </div>
    )
}
