import SignIn from "../components/signIn/signIn"
import {remult, setAuthToken} from "../common";
import { Navigate } from "react-router-dom";
import Button from '@mui/material/Button';

const signOut = () => {
    setAuthToken(null);
    window.location.reload();
}


export default function Login(){
    if (!remult.authenticated())
        return <SignIn />
    return <Navigate to="/app/home" replace={true} />

}

