import * as actionTypes from '../action_types/create';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_COURSE_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.CREATE_COURSE_DONE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
