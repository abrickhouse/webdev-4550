import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

// Checks if there is a current user
function ProtectedNonUserRoute({children}){
  const { currentUser } = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  if (current == null) {
    return children;
  }
  return <Navigate to="/login"/>

}

export default ProtectedNonUserRoute;