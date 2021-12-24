import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

export const cart = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems.find(x => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x._id === existItem._id ? item : x
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x._id !== payload),
      };

    default:
      return state;
  }
};
