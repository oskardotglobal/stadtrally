"use client";

import {FormEvent, useEffect, useState} from "react";
import {getSavedCode, saveCode} from "@/lib/storage";

export default function LoginPage() {
    const [code, setCode] = useState<string>("")
    const [profile, setProfile] = useState()
    let unauthorized = false

    useEffect(() => {
        if (!code) return setCode(getSavedCode(localStorage))
        if (!getSavedCode(localStorage) && code) return saveCode(code, localStorage)

        refetch_profile()
    }, [code, profile]);

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
                saveCode(code, localStorage)
            })

        refetch_profile()
    }

    function refetch_profile() {
        if (!profile) {
            fetch(`/api/profile?code=${code}`)
                .then(res => res.json())
                .then(json => setProfile(json))
        }
    }

    function update_profile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            name: {value: string},
            memberNames: {value: string}
        }

        fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify({
                code: code,
                name: formElements.name.value,
                member_names: formElements.memberNames.value
            })
        })

        refetch_profile()
    }

    if (code) {
        // TODO: go back to page you came from

        refetch_profile()

        return <div>
            <h1>Edit profile</h1>
            <form onSubmit={update_profile}>
                <span>Team Name</span> <br/>
                <input
                    type="text"
                    id="name"
                    required={false}
                    defaultValue={// @ts-ignore
                    profile?.name}
                />

                <br/>

                <span>Member Names</span> <br/>
                <input
                    type="text"
                    id="memberNames"
                    defaultValue={// @ts-ignore
                    profile?.member_names}
                    required={false}
                />

                <br/>

                <button type="submit">Update</button>
            </form>
        </div>
    }

    if (unauthorized) return <div>
        <h1>Login</h1>
        <form onSubmit={login}>
            <span>Login Code</span> <br/>
            <input
                type="text"
                id="codeInput"
                required={true}
                minLength={6}
                maxLength={6}
            />

            <br/>

            <button type="submit">Submit</button>
        </form>

        <p>Incorrect code.</p>
    </div>

    return <div>
        <h1>Login</h1>
        <form onSubmit={login}>
            <span>Login Code</span> <br/>
            <input
                type="text"
                id="codeInput"
                required={true}
                minLength={6}
                maxLength={6}
            />

            <br/>

            <button type="submit">Submit</button>
        </form>
    </div>
}
