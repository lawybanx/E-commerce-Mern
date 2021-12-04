import axios from 'axios';
import {
  PRODUCTS_LIST_PAGE,
  PRODUCT_DETAILS_PAGE,
  PRODUCT_ERROR,
} from './types';

// Get All products
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');

    dispatch({
      type: PRODUCTS_LIST_PAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get product ById
export const getProductById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_PAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
