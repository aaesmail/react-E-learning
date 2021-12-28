import * as actionTypes from '../action_types/comments';

const initialState = {
  creatingQuestion: false,
  creatingReply: null,
  questions: [],
  pages: 1,
  deletingQuestion: null,
  deletingReply: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_QUESTION_START:
      return {
        ...state,
        creatingQuestion: true,
      };

    case actionTypes.CREATE_QUESTION_DONE:
      return {
        ...state,
        creatingQuestion: false,
      };

    case actionTypes.DELETE_QUESTION_START:
      return {
        ...state,
        deletingQuestion: action.payload,
      };

    case actionTypes.DELETE_QUESTION_DONE:
      return {
        ...state,
        deletingQuestion: null,
      };

    case actionTypes.REMOVE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.id !== action.payload,
        ),
      };

    case actionTypes.ADD_NEW_QUESTION:
      return _addNewQuestion(state, action);

    case actionTypes.ADD_ALL_QUESTIONS:
      return {
        ...state,
        questions: action.payload.data,
        pages: Math.ceil(action.payload.total / 10),
      };

    case actionTypes.CREATE_REPLY_START:
      return {
        ...state,
        creatingReply: action.payload,
      };

    case actionTypes.CREATE_REPLY_DONE:
      return {
        ...state,
        creatingReply: null,
      };

    case actionTypes.ADD_NEW_REPLY:
      return {
        ...state,
        questions: state.questions.map((question) => {
          if (question.id === action.payload.questionId) {
            question.replies.push(action.payload.reply);
          }
          return question;
        }),
      };

    case actionTypes.DELETE_REPLY_START:
      return {
        ...state,
        deletingReply: action.payload,
      };

    case actionTypes.DELETE_REPLY_DONE:
      return {
        ...state,
        deletingReply: null,
      };

    case actionTypes.REMOVE_REPLY:
      return {
        ...state,
        questions: state.questions.map((question) => {
          if (question.id === action.payload.questionId) {
            question.replies = question.replies.filter(
              (reply) => reply.id !== action.payload.replyId,
            );
          }
          return question;
        }),
      };

    default:
      return state;
  }
};

const _addNewQuestion = (state, action) => {
  if (action.payload.page === 1)
    return {
      ...state,
      questions: [action.payload.question, ...state.questions.slice(0, -1)],
    };

  return state;
};

export default reducer;
