import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/auth';
import { SET_ME } from '../action_types/me';

export const initAuth = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return dispatch({
        type: actionTypes.AUTH_INIT,
        payload: { token, type: null },
      });
    }

    api.defaults.headers.common['Authorization'] = token;

    try {
      const response = await api.get('/users/me');

      dispatch({ type: SET_ME, payload: response.data });

      dispatch({
        type: actionTypes.AUTH_INIT,
        payload: { token, type: response.data.type },
      });
    } catch {
      toast.error('Authentication Error!');
    }
  };
};

export const login = (userInfo, navigate) => {
  return _authenticate('auth/login', userInfo, navigate);
};

export const signup = (userInfo, navigate) => {
  return _authenticate('auth/signup', userInfo, navigate);
};

export const logout = (navigate) => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  navigate('/');

  return { type: actionTypes.AUTH_RESET };
};

export const resetAuth = () => {
  return { type: actionTypes.AUTH_RESET };
};

const _authenticate = (url, data, navigate) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.AUTH_START });

    try {
      const response = await api.post(url, data);

      localStorage.setItem('token', response.token);

      api.defaults.headers.common['Authorization'] = response.token;

      const userData = await api.get('/users/me');
      dispatch({ type: SET_ME, payload: userData.data });

      navigate('/');
      dispatch({ type: actionTypes.AUTH_SUCCESS, payload: response });
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_FAIL,
        payload: error.response.data.message,
      });
    }

    dispatch({ type: actionTypes.AUTH_DONE });
  };
};
