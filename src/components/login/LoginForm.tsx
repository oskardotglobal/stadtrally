// MOM LOOK I DID THE THING NO TS-IGNORE!
import {FormEventHandler} from "react";

export default function LoginForm({login}: {login: FormEventHandler<HTMLFormElement>}) {
    return <>
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

            <button type={"submit"}>Submit</button>
        </form>
    </>
}
