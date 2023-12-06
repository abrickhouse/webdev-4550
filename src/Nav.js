import { Link } from "react-router-dom";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

function Nav() {
 return (
  <nav className="nav nav-tabs mb-2 grid row">
   <div>
    {" "}
    <Link className="float-start nav-linkx" to="/">
     Home
    </Link>
<<<<<<< HEAD
    {/* <ProtectedAdminRoute> */}
    <Link className="float-end nav-linkx" to="/admin">
      Admin
    </Link>
    {/* </ProtectedAdminRoute> */}
=======
>>>>>>> 4b156017a1432775945b84230b1c93df7214c825
    <Link className="float-end nav-linkx" to="/login">
      Login
    </Link>
    <Link className="float-end nav-linkx" to="/Profile/1">
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
