import {
  CLIENT_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLIENT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        client: action.payload.client,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return { ...state };

    default:
      return state;
  }
};
