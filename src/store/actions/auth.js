import api from '../../api';
import * as actionTypes from '../action_types/auth';

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_START });

    try {
      const response = await api.post(
        'https://e-learning.getsandbox.com/auth/login',
        { email, password },
      );

      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response.token });
    } catch (error) {
      dispatch({ type: actionTypes.LOGIN_FAIL, payload: error.message });
    }

    dispatch({ type: actionTypes.LOGIN_DONE });
  };
};

export const logout = () => {
  return { type: actionTypes.LOGOUT };
};
