import React, { useReducer } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  CLIENT_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
} from '../types';

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
    try {
      const response = await axios.get('/api/users/me');
      dispatch({ type: CLIENT_LOADED, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async client => {
    try {
      const response = await axios.post('/api/users', client);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      loadClient();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        client: state.client,
        loadClient,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
