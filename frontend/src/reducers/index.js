import { combineReducers } from 'redux';
import { cart } from './cart';
import { user, userDetails, userUpdateProfile } from './user';
import { productList, productDetails } from './product';

export default combineReducers({
  productList,
  productDetails,
  cart,
  user,
  userDetails,
  userUpdateProfile,
});
