import * as actionTypes from '../action_types/admin';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_CHANGE_ROLE:
      return {
        loading: true,
      };

    case actionTypes.DONE_CHANGE_ROLE:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
