import * as actionTypes from '../action_types/courses';

const initialState = {
  loading: false,
  error: false,
  courses: [],
  pages: 1,
  removingCourse: null,
  enrollingCourse: null,
  unenrollingCourse: null,
  updatingCourse: false,
  currentCourse: null,
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

    case actionTypes.DELETE_COURSE_START:
      return {
        ...state,
        removingCourse: action.payload,
      };

    case actionTypes.DELETE_COURSE_DONE:
      return {
        ...state,
        removingCourse: null,
      };

    case actionTypes.FETCH_CURRENT_COURSE_START:
      return {
        ...initialState,
        loading: true,
      };

    case actionTypes.FETCH_CURRENT_COURSE_SUCCESS:
      return {
        ...initialState,
        currentCourse: action.payload,
        pages: Math.ceil(action.payload.total_activities / 10),
      };

    case actionTypes.FETCH_CURRENT_COURSE_FAIL:
      return {
        ...initialState,
        error: true,
      };

    case actionTypes.ENROLL_COURSE_START:
      return {
        ...state,
        enrollingCourse: action.payload,
      };

    case actionTypes.ENROLL_COURSE_DONE:
      return {
        ...state,
        enrollingCourse: null,
      };

    case actionTypes.UNENROLL_COURSE_START:
      return {
        ...state,
        unenrollingCourse: action.payload,
      };

    case actionTypes.UNENROLL_COURSE_DONE:
      return {
        ...state,
        unenrollingCourse: null,
      };

    case actionTypes.UPDATE_COURSE_START:
      return {
        ...state,
        updatingCourse: true,
      };

    case actionTypes.UPDATE_COURSE_DONE:
      return {
        ...state,
        updatingCourse: false,
      };

    case actionTypes.EDIT_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
