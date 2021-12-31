import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";
import Axios from "axios";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  await Axios.post("http://localhost:9000/api/users/signin", {
    email,
    password,
  })
    .then((res) => {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    })
    .catch((err) => {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: err.message,
      });
    });
};
export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  await Axios.post("http://localhost:9000/api/users/register", {
    name,
    email,
    password,
  })
    .then((res) => {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    })
    .catch((err) => {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: err.message,
      });
    });
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
};
