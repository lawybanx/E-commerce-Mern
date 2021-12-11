import { combineReducers } from 'redux';
import { productList, product } from './product';

export default combineReducers({
  productList: productList,
  product: product,
});
