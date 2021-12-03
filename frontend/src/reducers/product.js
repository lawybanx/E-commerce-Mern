import { GET_PRODUCTS } from '../actions/types';

const initialState = {
  products: [],
  product: null,
  loading: true,
};

const product = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload, loading: false };

    default:
      return state;
  }
};

export default product;
