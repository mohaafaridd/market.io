import React, { useReducer } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  CLIENT_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
} from '../types';

const AuthState = props => {
  const [cookies] = useCookies(['token', 'client']);
  const initialState = {
    client: null,
    error: null,
    isAuthenticated: false,
    loading: true,
    token: cookies.token,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Loads client (user or store) from MongoDB
  const loadClient = async () => {
    try {
      const response = await axios.get('/api/users/me');
      dispatch({ type: CLIENT_LOADED, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register a user or a store
  const register = async client => {
    try {
      const response = await axios.post('/api/users', client);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      loadClient();
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data });
    }
  };

  // Login a user or a store
  const login = async client => {
    try {
      const response = await axios.post('/api/users/login', client);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      loadClient();
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data });
    }
  };

  // Logout a user or a store
  const logout = async client => {
    try {
      const response = await axios.post('/api/users/logout');
      dispatch({ type: LOGOUT, payload: response.data });
      loadClient();
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        client: state.client,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        loadClient,
        register,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
