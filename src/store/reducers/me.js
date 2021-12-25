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

    case actionTypes.ADD_OWNED_COURSE:
      return {
        ...state,
        ownedCourses: [...state.ownedCourses, action.payload],
      };

    case actionTypes.REMOVE_OWNED_COURSE:
      return {
        ...state,
        ownedCourses: state.ownedCourses.filter(
          (course) => course.id !== action.payload,
        ),
      };

    default:
      return state;
  }
};

export default reducer;
