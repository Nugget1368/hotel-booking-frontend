import { Link } from "react-router"

const Header = () => {
  return (
    <header>
        <div className="row"></div>
        <div className="row">
            <Link to="/">Login</Link>
        </div>
    </header>
  )
}

export default Header