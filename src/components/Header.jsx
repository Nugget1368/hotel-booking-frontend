import { Link } from "react-router"
import { useState, useEffect } from "react";
import {MySessionStorage} from "../application/localStorage"
import { useNavigate } from "react-router";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    MySessionStorage.getUserInfo() ? setLoggedIn(true) : setLoggedIn(false);
  }, [loggedIn]);

  const logout = () => {
    MySessionStorage.removeUser();
    setLoggedIn(false);
    navigate("/");
  }

  return (
    <header id="main-header">
        <div className="row"></div>
        <div className="row">
            { loggedIn ?
            <button onClick={logout}>Log out</button> :
            <Link to="/profile/login">Login</Link>
            }
        </div>
    </header>
  )
}

export default Header