import { useSelector } from "react-redux";
import {  Navigate } from "react-router";


function ProtectedAdminRoute({ children }){
  const { currentUser } = useSelector((state) => state.UserReducer);
  if (currentUser && currentUser.role === "ADMIN") {
    return children;
  }
  return <Navigate to="/login"/>
}

export default ProtectedAdminRoute;