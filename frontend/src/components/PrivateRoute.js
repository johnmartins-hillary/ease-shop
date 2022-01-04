import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import ProfileScreen from "../Screens/ProfileScreen";

function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo ? <ProfileScreen /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
