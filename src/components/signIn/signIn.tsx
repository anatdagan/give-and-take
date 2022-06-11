import { useState } from "react"
import { ErrorInfo } from "remult";
import { remult, setAuthToken } from "../../common";
import { terms } from "../../shared/terms";
import { SignInController } from "./SignInController";

const SignIn = () => {
    const [user, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ErrorInfo<SignInController>>();

    const signIn = async () => {
        try {
            setError(undefined);
            setAuthToken(await new SignInController(remult).assign({ user, password }).signIn());
            window.location.reload();
        }
        catch (error: any) {
            setError(error);
        }
    }
    return <div>
        <input value={user} placeholder="User name" type="text" onChange={e => setUsername(e.target.value)} />
        <input value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={signIn}>{terms.signIn}</button>{error?.message}

    </div>
}
export default SignIn;