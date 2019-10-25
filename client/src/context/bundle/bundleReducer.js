import {
  BUNDLE_ERROR,
  ADD_BUNDLE,
  UPDATE_BUNDLE,
  CLEAR_BUNDLE,
  SET_PRODUCT,
  PUT_BUNDLE_PRODUCT,
  GET_BUNDLES,
  SET_BUNDLE,
  GET_BUNDLE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BUNDLES:
      return {
        ...state,
        bundles: action.payload.bundles,
        bundle: null,
        product: null,
        error: null,
        loading: false,
      };

    case GET_BUNDLE:
      return {
        ...state,
        products: action.payload.bundle.products,
      };

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

    case SET_BUNDLE:
      return {
        ...state,
        bundle: action.payload,
      };

    case ADD_BUNDLE:
      return {
        ...state,
        bundle: action.payload.bundle,
        error: null,
        loading: false,
        product: null,
        products: [],
        bundles: [...state.bundles, action.payload.bundle],
      };

    case UPDATE_BUNDLE:
      return {
        ...state,
        loading: false,
        bundles: state.bundles.map(bundle =>
          bundle._id === action.payload.bundle._id
            ? action.payload.bundle
            : bundle
        ),
      };

    case PUT_BUNDLE_PRODUCT:
      return {
        ...state,
        bundle: action.payload.bundle,
        bundles: state.bundles.map(bundle =>
          bundle._id === action.payload.bundle._id
            ? action.payload.bundle
            : bundle
        ),
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
