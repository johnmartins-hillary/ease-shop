import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstant";
import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstant";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const {
    userSignin: { userInfo },
  } = getState();

  await Axios.post("http://localhost:9000/api/orders", order, {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((data) => {
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem("cartItems");
    })
    .catch((err) => {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.message
            : err.message,
      });
    });
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  await Axios.get(`http://localhost:9000/api/orders/${orderId}`, orderId, {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((data) => {
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
      localStorage.removeItem("cartItems");
    })
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    });
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
      userSignin: { userInfo },
    } = getState();
    await Axios.put(
      `http://localhost:9000/api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
      .then((data) => {
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        localStorage.removeItem("cartItems");
      })
      .catch((err) => {
        const message =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message });
      });
  };

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  await Axios.get(`http://localhost:9000/api/orders/mine`, {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((data) => {
      console.log(data)
      dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    })
    .catch((err) => {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    });
};
