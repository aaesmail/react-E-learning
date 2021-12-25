import * as actionTypes from '../action_types/comments';

const initialState = {
  creatingQuestion: false,
  questions: [],
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

    case actionTypes.ADD_NEW_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };

    case actionTypes.ADD_ALL_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
