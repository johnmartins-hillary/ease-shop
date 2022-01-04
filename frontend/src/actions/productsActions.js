import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productsConstants";

import Axios from "axios";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  await Axios.get("http://localhost:9000/api/products")
    .then((response) => {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_LIST_FAIL, payloada: err.message });
    });
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  await Axios.get(`http://localhost:9000/api/products/${productId}`)
    .then((data) => {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.message
            : err.message,
      });
    });
};
