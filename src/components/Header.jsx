import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutGuest } from "../store/guestSlice.js";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = Boolean(useSelector((state) => state.guests.guestCurrent.token));

  const logout = () => {
    dispatch(logoutGuest());
    navigate("/");
  }

  return (
    <header className="main-header">
        <div className="main-header__spacer"></div>
        <div className="main-header__actions">
            { loggedIn ?
            <button onClick={logout}>Log out</button> :
            <Link to="/profile/login">Login</Link>
            }
        </div>
    </header>
  )
}

export default Header