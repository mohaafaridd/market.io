import { BUNDLE_ERROR, ADD_BUNDLE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_BUNDLE:
      return {
        ...state,
        bundle: action.payload.bundle,
        error: null,
        loading: false,
        product: null,
        products: [],
      };

    default:
      return state;
  }
};
