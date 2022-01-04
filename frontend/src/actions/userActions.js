import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
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
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  await Axios.post(`http://localhost:9000/api/users/${userId}`, {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((res) => {
      dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    });
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  
  const {
    userSignin: { userInfo },
  } = getState();
  await Axios.put(`http://localhost:9000/api/users/profile`, user, {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((res) => {
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: res.data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    })
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    });
};
