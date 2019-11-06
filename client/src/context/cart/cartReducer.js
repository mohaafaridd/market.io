import {
  GET_CARTS,
  EDIT_CART,
  DELETE_CART,
  CLEAR_CART,
  CREATE_ORDER,
  ADD_CART,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARTS:
      return {
        ...state,
        carts: action.payload.cart,
        loading: false,
      };

    case EDIT_CART:
      return {
        ...state,
        carts: action.payload.cart,
      };

    case DELETE_CART:
      return {
        ...state,
        carts: action.payload.cart,
      };

    case CLEAR_CART:
      return {
        ...state,
        carts: [],
      };

    case CREATE_ORDER:
      return {
        ...state,
        carts: [],
      };

    default:
      return state;
  }
};
