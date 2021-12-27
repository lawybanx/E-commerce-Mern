import { combineReducers } from 'redux';
import { cart } from './cart';
import { userLogin } from './user';
import { productList, productDetails } from './product';

export default combineReducers({
  productList,
  productDetails,
  cart,
  userLogin,
});
