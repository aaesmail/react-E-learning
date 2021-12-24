import * as actionTypes from '../action_types/auth';

const initialState = {
  init: true,
  loading: false,
  error: null,
  authenticated: false,
  token: null,
  admin: false,
  instructor: false,
  learner: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return {
        ...initialState,
        init: false,
        authenticated: action.payload.token !== null,
        token: action.payload.token,
        admin: action.payload.type === 'admin',
        instructor: action.payload.type === 'instructor',
        learner: action.payload.type === 'learner',
      };

    case actionTypes.AUTH_START:
      return {
        ...initialState,
        init: false,
        loading: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
        token: action.payload.token,
        admin: action.payload.type === 'admin',
        instructor: action.payload.type === 'instructor',
        learner: action.payload.type === 'learner',
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case actionTypes.AUTH_DONE:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.AUTH_RESET:
      return {
        ...initialState,
        init: false,
      };

    default:
      return state;
  }
};

export default reducer;
