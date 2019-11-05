import { GET_STATISTICS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_STATISTICS:
      return { ...state, current: action.payload.statistics, loading: false };

    default:
      return state;
  }
};
