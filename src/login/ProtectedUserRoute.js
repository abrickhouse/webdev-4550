import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

// Checks if there is a current user
function ProtectedUserRoute({children}){
  const { currentUser } = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login"/>

}

export default ProtectedUserRoute;