import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  await Axios.get(`http://localhost:9000/api/products/${productId}`)
    .then((res) => {
      console.log(res);
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
    .catch((err) => {
      console.log(err.message);
    });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
