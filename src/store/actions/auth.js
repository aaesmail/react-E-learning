import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/auth';

export const initAuth = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    if (token) {
      api.defaults.headers.common['Authorization'] = token;
    }

    dispatch({ type: actionTypes.AUTH_INIT, payload: { token, type } });

    if (token) {
      try {
        const response = await api.get('/users/me');

        localStorage.setItem('type', response.data.type);

        dispatch({
          type: actionTypes.AUTH_REFRESH_TYPE,
          payload: response.data.type,
        });
      } catch {
        toast.error('Authentication Error!');
      }
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
  localStorage.removeItem('type');
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
      localStorage.setItem('type', response.type);

      api.defaults.headers.common['Authorization'] = response.token;

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
