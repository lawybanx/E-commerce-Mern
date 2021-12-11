import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../actions/types';

export const productList = (state = { products: [] }, { type, payload }) => {
  switch (type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCTS_LIST_SUCCESS:
      return { loading: false, products: payload };

    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const product = (state = { product: null }, { type, payload }) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: null };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
