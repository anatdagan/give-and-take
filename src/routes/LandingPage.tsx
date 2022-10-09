import '../css/LandingPage.css'
export default function LandingPage() {

    return <div>
        <div className="logo"></div>
        <div className="hero-image">
            <div className="hero-text">
                <h1>Do you have a drive to help?</h1>
            </div>
        </div>
        <div className="buttons">
            <a href="/app/Login" className="btn btn-primary">Login</a>
            <a href="/app/Register" className="btn btn-primary">Register</a>
        </div>
    </div>
}