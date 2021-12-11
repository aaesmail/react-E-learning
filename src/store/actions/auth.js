import api from '../../api';
import * as actionTypes from '../action_types/auth';

export const initAuth = () => {
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return { type: actionTypes.AUTH_INIT, payload: { token, type } };
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

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('type', response.data.type);

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;

      navigate('/');
      dispatch({ type: actionTypes.AUTH_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_FAIL,
        payload: error.response.data.message,
      });
    }

    dispatch({ type: actionTypes.AUTH_DONE });
  };
};
