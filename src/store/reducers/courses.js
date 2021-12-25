import * as actionTypes from '../action_types/courses';

const initialState = {
  loading: false,
  error: false,
  courses: [],
  pages: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COURSES_START:
      return {
        ...initialState,
        loading: true,
      };

    case actionTypes.FETCH_COURSES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        error: false,
        courses: action.payload.data,
        pages: Math.ceil(+action.payload.total / 12),
      };

    case actionTypes.FETCH_COURSES_FAIL:
      return {
        ...initialState,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
