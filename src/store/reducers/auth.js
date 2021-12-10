import * as actionTypes from '../action_types/auth';

const initialState = {
  loading: false,
  error: null,
  authenticated: false,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...initialState,
        loading: true,
      };

    case actionTypes.LOGIN_DONE:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        token: action.payload,
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case actionTypes.LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
