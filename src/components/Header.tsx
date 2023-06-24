"use client";

import {useEffect, useState} from "react";

export default function Header() {
    const [code, setCode] = useState<string>()
    const [name, setName] = useState()

    useEffect(() => {
        const stored = localStorage.getItem("authCode")
        if (!code && stored) setCode(stored)
    }, [code])

    if (!name && code) {
        fetch(`/api/profile?code=${code}`)
            .then(res => res.json())
            .then(json => setName(json.name))
    }

    return <header id="header">
        {
            code && name && <div>
                <strong>Logged in as {name}</strong>
            </div>
        }
    </header>
}
