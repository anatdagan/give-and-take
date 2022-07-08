import SignIn from "../components/signIn/signIn"
import {remult, setAuthToken} from "../common";

const signOut = () => {
    setAuthToken(null);
    window.location.reload();
}


export default function Login() {
    if (!remult.authenticated())
        return <SignIn />
    return <div>
        <p>
            Hi {remult.user.name} <button onClick={signOut}>Sign out</button>
            <h1>Login</h1>
        </p>
    </div>
}