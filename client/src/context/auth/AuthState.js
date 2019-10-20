import React, { useReducer } from 'react';
import { useCookies } from 'react-cookie';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { CLIENT_LOADED, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

const AuthState = props => {
  const [cookies] = useCookies(['token', 'client']);
  const initialState = {
    client: null,
    error: null,
    isAuthenticated: null,
    loading: true,
    token: cookies.token,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadClient = async () => {
    const token = cookies.token;
    dispatch({ type: CLIENT_LOADED });
  };

  const register = async client => {
    if (client) {
      console.log('client', client);
      dispatch({ type: REGISTER_SUCCESS });
    } else {
      dispatch({ type: REGISTER_FAIL });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loadClient,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
