import { GET_ORDERS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        loading: false,
      };

    default:
      return state;
  }
};
