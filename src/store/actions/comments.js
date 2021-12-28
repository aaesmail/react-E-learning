import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/comments';

export const createQuestion = (courseId, title, description, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_QUESTION_START });

    try {
      const response = await api.post(`courses/${courseId}/questions`, {
        title,
        description,
      });

      dispatch({
        type: actionTypes.ADD_NEW_QUESTION,
        payload: {
          question: response.data,
          page,
        },
      });

      toast.success('Question created successfully!');
    } catch {
      toast.error('Error creating question');
    } finally {
      dispatch({ type: actionTypes.CREATE_QUESTION_DONE });
    }
  };
};

export const deleteQuestion = (courseId, questionId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_QUESTION_START, payload: questionId });

    try {
      await api.delete(`courses/${courseId}/questions/${questionId}`);

      toast.success('Question deleted successfully!');
      dispatch({ type: actionTypes.REMOVE_QUESTION, payload: questionId });
    } catch {
      toast.error('Error deleting question');
    } finally {
      dispatch({ type: actionTypes.DELETE_QUESTION_DONE });
    }
  };
};

export const getAllQuestions = (courseId, page) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `courses/${courseId}/questions?sort=-createdAt&page=${page}&limit=10`,
      );

      dispatch({ type: actionTypes.ADD_ALL_QUESTIONS, payload: response });
    } catch {
      toast.error('Error getting questions');
    }
  };
};
