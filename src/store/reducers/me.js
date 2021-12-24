import * as actionTypes from '../action_types/me';

const initialState = {
  firstName: null,
  lastName: null,
  birthDate: null,
  enrolledCourses: [],
  email: null,
  type: null,
  username: null,
  background: null,
  ownedCourses: [],
  id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ME:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
