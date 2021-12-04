import {
  PRODUCTS_LIST_PAGE,
  PRODUCT_DETAILS_PAGE,
  PRODUCT_ERROR,
} from '../actions/types';

const initialState = {
  products: [],
  product: null,
  loading: true,
  error: {},
};

const product = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_LIST_PAGE:
      return { ...state, products: payload, loading: false, product: null };

    case PRODUCT_DETAILS_PAGE:
      return { ...state, product: payload, loading: false };

    case PRODUCT_ERROR:
      return { ...state, error: payload, profile: null, loading: false };

    default:
      return state;
  }
};

export default product;
