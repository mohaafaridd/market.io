import { GET_CARTS, EDIT_CART } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARTS:
      return {
        ...state,
        carts: action.payload.cart,
      };

    case EDIT_CART:
      return {
        ...state,
        carts: action.payload.cart,
      };

    default:
      return state;
  }
};
