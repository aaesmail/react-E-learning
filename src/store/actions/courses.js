import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/courses';
import {
  REMOVE_OWNED_COURSE,
  ADD_ENROLLED_COURSE,
  REMOVE_ENROLLED_COURSE,
} from '../action_types/me';

export const getCourses = (page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COURSES_START });

    try {
      const response = await api.get(
        `/courses?page=${page}&limit=12&sort=-createdAt`,
      );

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

export const deleteCourse = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_COURSE_START, payload: id });

    try {
      await api.delete('/courses/' + id);

      dispatch({ type: REMOVE_OWNED_COURSE, payload: id });
      toast.success('Course deleted!');
    } catch {
      toast.error("Couldn't delete course!");
    } finally {
      dispatch({ type: actionTypes.DELETE_COURSE_DONE });
    }
  };
};

export const enrollCourse = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ENROLL_COURSE_START, payload: id });

    try {
      await api.post(`courses/${id}/enroll`);

      dispatch({ type: ADD_ENROLLED_COURSE, payload: id });
      toast.success('Enrolled in course!');
    } catch {
      toast.error("Couldn't enroll in course!");
    } finally {
      dispatch({ type: actionTypes.ENROLL_COURSE_DONE });
    }
  };
};

export const unenrollCourse = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UNENROLL_COURSE_START, payload: id });

    try {
      await api.delete(`courses/${id}/enroll`);

      dispatch({ type: REMOVE_ENROLLED_COURSE, payload: id });

      toast.success('Unenrolled from course!');
    } catch {
      toast.error("Couldn't unenroll from course!");
    } finally {
      dispatch({ type: actionTypes.UNENROLL_COURSE_DONE });
    }
  };
};

export const fetchCurrentCourse = (id, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CURRENT_COURSE_START });

    try {
      const response = await api.get(
        `courses/${id}?page=${page}&limit=10&sort=-createdAt`,
      );

      dispatch({
        type: actionTypes.FETCH_CURRENT_COURSE_SUCCESS,
        payload: response.data,
      });
    } catch {
      toast.error("Couldn't find course!");
      dispatch({ type: actionTypes.FETCH_CURRENT_COURSE_FAIL });
    }
  };
};

export const editCourse = (id, title, syllabus) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_COURSE_START });

    try {
      await api.patch(`courses/${id}`, { title, syllabus });

      toast.success('Course updated!');

      dispatch({
        type: actionTypes.EDIT_CURRENT_COURSE,
        payload: { title, syllabus },
      });
    } catch {
      toast.error("Couldn't update course!");
    } finally {
      dispatch({ type: actionTypes.UPDATE_COURSE_DONE });
    }
  };
};
