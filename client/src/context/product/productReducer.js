import {
  PRODUCT_ERROR,
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        current: action.payload.product,
        products: null,
        error: null,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        current: null,
        error: null,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        products: null,
        current: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
