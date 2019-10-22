import {
  SET_CURRENT,
  SET_LOADING,
  PRODUCT_ERROR,
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case ADD_PRODUCT:
      return {
        ...state,
        current: null,
        products: [...state.products, action.payload],
        error: null,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        current: null,
        error: null,
        loading: false,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        ),
        loading: false,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload._id
        ),
        loading: false,
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
