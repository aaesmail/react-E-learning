import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/comments';

export const createQuestion = (courseId, title, description) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_QUESTION_START });

    try {
      const response = await api.post(`courses/${courseId}/questions`, {
        title,
        description,
      });

      dispatch({ type: actionTypes.ADD_NEW_QUESTION, payload: response.data });

      toast.success('Question created successfully!');
    } catch {
      toast.error('Error creating question');
    } finally {
      dispatch({ type: actionTypes.CREATE_QUESTION_DONE });
    }
  };
};

export const getAllQuestions = (courseId) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `courses/${courseId}/questions?sort=-createdAt`,
      );

      dispatch({ type: actionTypes.ADD_ALL_QUESTIONS, payload: response.data });
    } catch {
      toast.error('Error getting questions');
    }
  };
};
