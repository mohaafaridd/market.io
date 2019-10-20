import { CLIENT_LOADED, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLIENT_LOADED:
      return { ...state };

    case REGISTER_SUCCESS:
      return { ...state };

    case REGISTER_FAIL:
      return { ...state };

    default:
      return state;
  }
};
