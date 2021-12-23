import { CART_ADD_ITEM } from '../actions/types';

export const cart = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems.find(x => x.product === item.product);
      if (existItem) {
        return { ...state };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    default:
      return state;
  }
};
