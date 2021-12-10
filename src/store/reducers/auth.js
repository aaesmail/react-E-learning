import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_DONE,
  LOGOUT,
} from '../action_types/auth';

const initialState = {
  loading: false,
  error: null,
  authenticated: false,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...initialState,
        loading: true,
      };

    case LOGIN_DONE:
      return {
        ...state,
        loading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        token: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
