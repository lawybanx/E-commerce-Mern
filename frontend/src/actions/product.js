import axios from 'axios';
import { GET_PRODUCTS } from './types';

// Get All products
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: {
    //     msg: err.response.statusText,
    //     status: err.response.status,
    //   },
    // });
  }
};
