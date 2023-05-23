import { Navigate } from 'react-router-dom'
import {remult, setAuthToken} from "../common";

import '../css/LandingPage.css'

export default function LandingPage() {
    if (remult.authenticated()) {
        return <Navigate to="/app/home" replace={true} />
    }
    return <div>
        <div className="hero-image">
            <div className="hero-text">
                <h1>Do you have a drive to help?</h1>
            </div>
        </div>
        <div className="buttons">
            <a href="login" className="btn btn-primary">Login</a>
            <a href="register" className="btn btn-primary">Register</a>
        </div>
    </div>
}