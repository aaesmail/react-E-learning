import api from '../../api';
import * as actionTypes from '../action_types/auth';

export const initAuth = () => {
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');

  return { type: actionTypes.AUTH_INIT, payload: { token, type } };
};

export const login = (userInfo) => {
  return _authenticate('auth/login', userInfo);
};

export const signup = (userInfo) => {
  return _authenticate('auth/signup', userInfo);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('type');

  return { type: actionTypes.AUTH_LOGOUT };
};

const _authenticate = (url, data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.AUTH_START });

    try {
      const response = await api.post(url, data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('type', response.data.type);

      dispatch({ type: actionTypes.AUTH_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: actionTypes.AUTH_FAIL, payload: error.message });
    }

    dispatch({ type: actionTypes.AUTH_DONE });
  };
};
