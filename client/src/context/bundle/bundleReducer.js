import {
  BUNDLE_ERROR,
  ADD_BUNDLE,
  UPDATE_BUNDLE,
  CLEAR_BUNDLE,
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

    default:
      return state;
  }
};
