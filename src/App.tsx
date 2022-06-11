import { remult, setAuthToken } from "./common";
import ChangePassword from "./components/changePassword/changePassword";
import SignIn from "./components/signIn/signIn";
import Users from "./components/users";


function App() {


  const signOut = () => {
    setAuthToken(null);
    window.location.reload();
  }
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

export default App
