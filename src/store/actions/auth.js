import api from '../../api';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_DONE,
  LOGOUT,
} from '../action_types/auth';

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_START });

    try {
      const response = await api.post(
        'https://e-learning.getsandbox.com/auth/login',
        { email, password },
      );

      dispatch({ type: LOGIN_SUCCESS, payload: response.token });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }

    dispatch({ type: LOGIN_DONE });
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
