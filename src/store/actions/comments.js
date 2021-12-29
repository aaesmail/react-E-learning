import { toast } from 'react-toastify';

import api from '../../api';
import * as actionTypes from '../action_types/comments';

export const createQuestion = (
  courseId,
  title,
  description,
  page,
  firstName,
  lastName,
) => {
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
          question: {
            ...response.data,
            author: { id: response.data.author, firstName, lastName },
          },
          page,
        },
      });

      dispatch(getAllQuestions(courseId, page));

      toast.success('Question created successfully!');
    } catch {
      toast.error('Error creating question');
    } finally {
      dispatch({ type: actionTypes.CREATE_QUESTION_DONE });
    }
  };
};

export const deleteQuestion = (courseId, questionId, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_QUESTION_START, payload: questionId });

    try {
      await api.delete(`courses/${courseId}/questions/${questionId}`);

      toast.success('Question deleted successfully!');
      dispatch({ type: actionTypes.REMOVE_QUESTION, payload: questionId });

      dispatch(getAllQuestions(courseId, page));
    } catch {
      toast.error('Error deleting question');
    } finally {
      dispatch({ type: actionTypes.DELETE_QUESTION_DONE });
    }
  };
};

export const getAllQuestions = (courseId, page) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_QUESTIONS_START });
    try {
      const response = await api.get(
        `courses/${courseId}/questions?sort=-createdAt&page=${page}&limit=10`,
      );

      dispatch({ type: actionTypes.ADD_ALL_QUESTIONS, payload: response });
    } catch {
      toast.error('Error getting questions');
    } finally {
      dispatch({ type: actionTypes.FETCH_QUESTIONS_DONE });
    }
  };
};

export const createReply = (
  courseId,
  questionId,
  reply,
  firstName,
  lastName,
) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_REPLY_START, payload: questionId });

    try {
      const response = await api.post(
        `courses/${courseId}/questions/${questionId}/replies`,
        { reply },
      );

      dispatch({
        type: actionTypes.ADD_NEW_REPLY,
        payload: {
          questionId,
          reply: {
            ...response.data,
            author: { id: response.data.author, firstName, lastName },
          },
        },
      });

      toast.success('Reply created successfully!');
    } catch {
      toast.error('Error creating reply');
    } finally {
      dispatch({ type: actionTypes.CREATE_REPLY_DONE });
    }
  };
};

export const deleteReply = (courseId, questionId, replyId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_REPLY_START, payload: replyId });

    try {
      await api.delete(
        `courses/${courseId}/questions/${questionId}/replies/${replyId}`,
      );

      dispatch({
        type: actionTypes.REMOVE_REPLY,
        payload: {
          questionId,
          replyId,
        },
      });

      toast.success('Reply deleted successfully!');
    } catch {
      toast.error('Error deleting reply');
    } finally {
      dispatch({ type: actionTypes.DELETE_REPLY_DONE });
    }
  };
};
