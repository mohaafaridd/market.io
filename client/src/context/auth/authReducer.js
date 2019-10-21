import {
  CLIENT_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLIENT_LOADED:
      return {
        ...state,
        client: action.payload.client,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        client: action.payload.client,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        client: null,
        isAuthenticated: false,
        loading: false,
        token: false,
      };

    case AUTH_ERROR:
      return {
        ...state,
        client: null,
        error: action.payload,
        isAuthenticated: false,
        loading: false,
        token: false,
      };

    default:
      return state;
  }
};
