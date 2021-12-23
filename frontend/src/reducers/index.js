import { combineReducers } from 'redux';
import { cart } from './cart';
import { productList, productDetails } from './product';

export default combineReducers({
  productList,
  productDetails,
  cart,
});
