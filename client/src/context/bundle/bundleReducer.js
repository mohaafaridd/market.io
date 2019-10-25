import {
  BUNDLE_ERROR,
  ADD_BUNDLE,
  UPDATE_BUNDLE,
  CLEAR_BUNDLE,
  SET_PRODUCT,
  PUT_BUNDLE_PRODUCT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLEAR_BUNDLE:
      return {
        ...state,
        bundle: null,
        product: null,
        error: null,
        loading: false,
        products: [],
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case ADD_BUNDLE:
      return {
        ...state,
        bundle: action.payload.bundle,
        error: null,
        loading: false,
        product: null,
        products: [],
      };

    case UPDATE_BUNDLE:
      return {
        ...state,
        loading: false,
      };

    case PUT_BUNDLE_PRODUCT:
      console.log('action.payload.bundle', action.payload.bundle);
      return {
        ...state,
        bundle: action.payload.bundle,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
