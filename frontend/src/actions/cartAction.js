import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstant";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  await Axios.get(`http://localhost:9000/api/products/${productId}`)
    .then((res) => {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: res.data.name,
          image: res.data.image,
          price: res.data.price,
          countInStock: res.data.countInStock,
          product: res.data._id,
          qty,
        },
      });
    })
    .catch((err) => {});
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
