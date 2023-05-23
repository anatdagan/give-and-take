import {Link} from 'react-router-dom'
interface NavBarProps {
    isLoggedIn: boolean
}

function NavBar(props: NavBarProps) {
    const isLoggedIn = {props};
    let authButtons;
    if (isLoggedIn) {
        authButtons = <Link to="/Logout">Logout</Link>;
    } else {
        authButtons =          <span><Link to="/Register">Register</Link>|{" "}
        <Link to="/Login">Login</Link></span>
    }
return (

      <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
      >
        <Link to="/Home">Home</Link> |{" "}
        {authButtons}
      </nav>
);
}

export default NavBar
