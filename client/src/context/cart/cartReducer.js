import { GET_CARTS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARTS:
      return {
        ...state,
        carts: action.payload.carts,
      };

    default:
      return state;
  }
};
