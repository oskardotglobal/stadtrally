import {FormEvent, useState} from "react";
import Loading from "@/components/Loading";

export default function ProfileForm({code}: {code: string}) {
    const [name, setName] = useState()
    const [memberNames, setMemberNames] = useState()

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

    function refetch_profile() {
        if (!name || !memberNames) {
            fetch(`/api/profile?code=${code}`)
                .then(res => res.json())
                .then(json => {
                    setName(json.name)
                    setMemberNames(json.member_names)
                })
        }
    }

    refetch_profile()

    if (!name || !memberNames) return <Loading />

    return <div>
        <h1>Edit profile</h1>
        <form onSubmit={update_profile}>
            <span>Team Name</span> <br/>
            <input
                type="text"
                id="name"
                required={false}
                defaultValue={name}
            />

            <br/>

            <span>Member Names</span> <br/>
            <input
                type="text"
                id="memberNames"
                required={false}
                defaultValue={memberNames}
            />

            <br/>

            <button type="submit">Update</button>
        </form>
    </div>
}
