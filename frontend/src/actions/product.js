import axios from 'axios';
import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from './types';

// Get All products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });

    const res = await axios.get('/api/products');

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// Get product ById
export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
