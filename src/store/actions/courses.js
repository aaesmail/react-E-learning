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

export const deleteCourse = (id, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_COURSE_START, payload: id });

    try {
      await api.delete('/courses/' + id);

      dispatch({ type: REMOVE_OWNED_COURSE, payload: id });
      dispatch(getCourses(page));
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

export const loadActivities = () => {
  return { type: actionTypes.LOAD_ACTIVITIES };
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

export const createVideoActivity = (courseId, title, description, url) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ACTIVITY_START });

    try {
      const response = await api.post(`courses/${courseId}/activities/video`, {
        title,
        description,
        url,
      });

      dispatch({
        type: actionTypes.ADD_NEW_ACTIVITY,
        payload: response.data,
      });

      toast.success('Video Activity created!');
    } catch {
      toast.error("Couldn't create Video Activity!");
    } finally {
      dispatch({ type: actionTypes.CREATE_ACTIVITY_DONE });
    }
  };
};

export const deleteVideoActivity = (courseId, activityId, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ACTIVITY_START });

    try {
      await api.delete(`courses/${courseId}/activities/video/${activityId}`);

      dispatch({ type: actionTypes.REMOVE_ACTIVITY, payload: activityId });

      dispatch(loadActivities());
      dispatch(fetchCurrentCourse(courseId, page));

      toast.success('Video Activity deleted!');
    } catch {
      toast.error("Couldn't delete Video Activity!");
    } finally {
      dispatch({ type: actionTypes.DELETE_ACTIVITY_DONE });
    }
  };
};

export const createPdfActivity = (courseId, title, description, file) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ACTIVITY_START });

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);

      const response = await api.post(
        `courses/${courseId}/activities/pdf`,
        formData,
      );

      dispatch({
        type: actionTypes.ADD_NEW_ACTIVITY,
        payload: response.data,
      });

      toast.success('Pdf Activity created!');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch({ type: actionTypes.CREATE_ACTIVITY_DONE });
    }
  };
};

export const deletePdfActivity = (courseId, activityId, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ACTIVITY_START });

    try {
      await api.delete(`courses/${courseId}/activities/pdf/${activityId}`);

      dispatch({ type: actionTypes.REMOVE_ACTIVITY, payload: activityId });

      dispatch(loadActivities());
      dispatch(fetchCurrentCourse(courseId, page));

      toast.success('Pdf Activity deleted!');
    } catch {
      toast.error("Couldn't delete Pdf Activity!");
    } finally {
      dispatch({ type: actionTypes.DELETE_ACTIVITY_DONE });
    }
  };
};

export const createQuizActivity = (
  courseId,
  title,
  description,
  quiz,
  answers,
) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ACTIVITY_START });

    try {
      const response = await api.post(`courses/${courseId}/activities/quiz`, {
        title,
        description,
        answers,
        quiz,
      });

      dispatch({
        type: actionTypes.ADD_NEW_ACTIVITY,
        payload: response.data,
      });

      toast.success('Quiz Activity created!');
    } catch {
      toast.error("Couldn't create Quiz Activity!");
    } finally {
      dispatch({ type: actionTypes.CREATE_ACTIVITY_DONE });
    }
  };
};

export const deleteQuizActivity = (courseId, activityId, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ACTIVITY_START });

    try {
      await api.delete(`courses/${courseId}/activities/quiz/${activityId}`);

      dispatch({ type: actionTypes.REMOVE_ACTIVITY, payload: activityId });

      dispatch(loadActivities());
      dispatch(fetchCurrentCourse(courseId, page));

      toast.success('Quiz Activity deleted!');
    } catch {
      toast.error("Couldn't delete Quiz Activity!");
    } finally {
      dispatch({ type: actionTypes.DELETE_ACTIVITY_DONE });
    }
  };
};

export const takeQuiz = (courseId, quizId, quiz, title, description) => {
  return {
    type: actionTypes.TAKE_QUIZ_START,
    payload: { courseId, quizId, quiz, title, description },
  };
};

export const endQuiz = () => {
  return {
    type: actionTypes.TAKE_QUIZ_DONE,
  };
};

export const submitQuiz = (courseId, quizId, answers, navigate) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SUBMIT_QUIZ_START });

    try {
      const response = await api.post(
        `courses/${courseId}/activities/quiz/${quizId}`,
        {
          answers,
        },
      );

      toast.success('Quiz submitted!');

      dispatch(endQuiz());

      dispatch({
        type: actionTypes.ADD_GRADE,
        payload: { quizId, grade: response.grade },
      });

      navigate(`/courses/${courseId}`);
    } catch {
      toast.error("Couldn't submit quiz!");
    } finally {
      dispatch({ type: actionTypes.SUBMIT_QUIZ_DONE });
    }
  };
};
