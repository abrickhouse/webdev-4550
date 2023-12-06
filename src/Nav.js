import { Link } from "react-router-dom";
import UserReducer from "./login/UserReducer";
import { useSelector } from "react-redux";

function Nav() {
  // get the current user
  const { currentUser } = useSelector((state) => state.UserReducer);
  let currentUserId = "noUser";

  if (currentUser) {
    currentUserId = currentUser.id;
  }

  return (
    <nav className="nav nav-tabs mb-2 grid row">
      <div>
        {" "}
        <Link className="float-start nav-linkx" to="/">
          Home
        </Link>
        <Link className="float-end nav-linkx" to="/login">
          Login
        </Link>
        <Link className="float-end nav-linkx" to={`/Profile/${currentUserId}`}>
          Profile
        </Link>
        <Link className="float-end nav-linkx" to="/Screenings">
          Screenings
        </Link>
        <Link className="float-end nav-linkx" to="/Search">
          Search
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
