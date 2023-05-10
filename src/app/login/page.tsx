"use client";

import {FormEvent, useEffect, useState} from "react";
import {getSavedCode, saveCode} from "@/lib/storage";
import {useRouter} from "next/router";

export default function LoginPage() {
    const [code, setCode] = useState<string>("")
    let unauthorized = false
    const router = useRouter()

    useEffect(() => {
        if (!code) return setCode(getSavedCode(localStorage))
        if (!getSavedCode(localStorage) && code) return saveCode(code, localStorage)
    }, [code]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            codeInput: {value: string}
        }

        fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({ code: formElements.codeInput.value})
        })
            .then(res => res.json())
            .then(json => {
                if (!json.authorized) {
                    unauthorized = true
                    return
                }

                unauthorized = false
                setCode(formElements.codeInput.value)
                saveCode(code, localStorage)
            })
    }

    if (code) {
        // TODO: go back to page you came from
        return <p>Logged in</p>
    }

    if (unauthorized) return <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="codeInput"
                required={true}
                minLength={6}
                maxLength={6}
            />
            <button type="submit">Submit</button>
        </form>

        <p>Incorrect code.</p>
    </>

    return <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="codeInput"
                required={true}
                minLength={6}
                maxLength={6}
            />
            <button type="submit">Submit</button>
        </form>
    </>
}
