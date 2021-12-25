import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/courses';

export const getCourses = (page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COURSES_START });

    try {
      const response = await api.get(`/courses?page=${page}&limit=12`);

      dispatch({
        type: actionTypes.FETCH_COURSES_SUCCESS,
        payload: response,
      });
    } catch {
      dispatch({ type: actionTypes.FETCH_COURSES_FAIL });

      toast.error("Couldn't fetch courses!");
    }
  };
};
