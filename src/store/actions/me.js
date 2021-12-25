import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/me';

export const fetchMe = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/users/me');

      dispatch({ type: actionTypes.SET_ME, payload: response.data });
    } catch {
      toast.error('Failed to fetch user info');
    }
  };
};
