import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/create';
import { ADD_OWNED_COURSE } from '../action_types/me';

export const createCourse = (title, syllabus) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_COURSE_START });

    try {
      const course = await api.post('courses', { title, syllabus });

      dispatch({ type: ADD_OWNED_COURSE, payload: course.data });

      toast.success('Course created successfully!');
    } catch {
      toast.error('Failed to create course!');
    } finally {
      dispatch({ type: actionTypes.CREATE_COURSE_DONE });
    }
  };
};
