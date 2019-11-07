import { GET_STATISTICS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_STATISTICS:
      return {
        ...state,
        statistics: action.payload.statistics[0],
        loading: false,
      };

    case GET_STATISTICS:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
