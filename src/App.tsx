import {Outlet, Link} from 'react-router-dom'

function App() {
return (
    <div>
      <h1>Give & Take</h1>
      <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
      >
        <Link to="/Home">Home</Link> |{" "}
        <Link to="/Register">Register</Link> |{" "}
        <Link to="/Login">Login</Link>

      </nav>
      <Outlet />
    </div>
);
}

export default App
