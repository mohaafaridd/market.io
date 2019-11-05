import { GET_STATISTICS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_STATISTICS:
      return {
        ...state,
        statistics: action.payload.statistics[0],
        loading: false,
      };

    default:
      return state;
  }
};
