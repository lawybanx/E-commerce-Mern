import { combineReducers } from 'redux';
import { productList, productDetails } from './product';

export default combineReducers({
  productList: productList,
  productDetails: productDetails,
});
