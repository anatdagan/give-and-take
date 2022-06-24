import SignIn from "../components/signIn/signIn"
import {remult, setAuthToken} from "../common";
import ChangePassword from "../components/changePassword/changePassword";
import Users from "../components/users";
const signOut = () => {
    setAuthToken(null);
    window.location.reload();
}


export default function Register() {
    if (!remult.authenticated())
        return <SignIn />
    return <div>
        <p>
            Hi {remult.user.name} <button onClick={signOut}>Sign out</button>
            <ChangePassword />
        </p>
        <Users />
    </div>
}