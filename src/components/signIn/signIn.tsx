import { useState } from "react"
import { ErrorInfo } from "remult";
import { remult, setAuthToken } from "../../common";
import { terms } from "../../shared/terms";
import { SignInController } from "./SignInController";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

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
        <TextField value={user} placeholder="User name" type="text" onChange={e => setUsername(e.target.value)} /><br/>
        <TextField value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} /><br/>
        <Button onClick={signIn} variant="contained">{terms.signIn}</Button>{error?.message}

    </div>
}
export default SignIn;