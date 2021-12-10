import {
  START_LOGIN,
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
    case START_LOGIN:
      return {
        ...state,
        authenticated: false,
        token: null,
        loading: true,
        error: null,
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
