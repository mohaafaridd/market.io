import { CLIENT_LOADED, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLIENT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        client: action.payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
      return { ...state };

    default:
      return state;
  }
};
