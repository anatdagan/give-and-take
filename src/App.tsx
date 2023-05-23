import {Outlet, Link} from 'react-router-dom'
import NavBar from './components/nav/navBar';
import {remult} from "./common";

function App() {
return (
    <div>
      <h1>Give & Take</h1>
      <NavBar isLoggedIn={remult.authenticated()}></NavBar>
      <Outlet />
    </div>
);
}

export default App
