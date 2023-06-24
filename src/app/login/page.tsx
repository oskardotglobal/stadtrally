"use client";

import {FormEvent} from "react";
import {useLoginCode} from "@/lib/hooks";
import LoginForm from "@/components/login/LoginForm";
import ProfileForm from "@/components/login/ProfileForm";
import React from "react";

import "@/styles/globals.scss";

export default function LoginPage() {
    const [code, setCode] = useLoginCode()
    let unauthorized = false

    document.getElementById("header")

    function login(event: FormEvent<HTMLFormElement>) {
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
                localStorage.setItem("authCode", code)
            })
    }

    if (code) {
        return <div>
            {
                // @ts-ignore why the fuck
                // note to self: put swear counter inside ts-ignores onto readme
                <ProfileForm
                    code={code}>
                </ProfileForm>
            }

            <br />
            <button><a href="/">Start playing</a></button>
        </div>
    }

    if (unauthorized) return <div>
        <LoginForm login={login} />

        <p>Incorrect code.</p>
    </div>

    return <div>
        <LoginForm login={login} />
    </div>
}
