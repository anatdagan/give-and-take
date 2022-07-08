import {remult, setAuthToken} from "../../common";

const signOut = () => {
    setAuthToken(null);
    window.location.reload();
}


export default function Greet() {
    return <p>
        Hi {remult.user.name} <button onClick={signOut}>Sign out</button>
        <h1>Login</h1>
    </p>
}