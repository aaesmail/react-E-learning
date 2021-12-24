import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/admin';

export const changeRole = (userId, role, background) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.START_CHANGE_ROLE });

    try {
      await api.put(`/users/${userId}/role`, { role, background });

      toast.success('Role changed successfully!');
    } catch {
      toast.error("Couldn't change role!");
    } finally {
      dispatch({ type: actionTypes.DONE_CHANGE_ROLE });
    }
  };
};
