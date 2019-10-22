import {
  PRODUCT_ERROR,
  ADD_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        current: action.payload.product,
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
