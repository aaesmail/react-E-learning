import * as actionTypes from '../action_types/courses';

const initialState = {
  loading: false,
  error: false,
  loadingActivities: false,
  courses: [],
  pages: 1,
  removingCourse: null,
  enrollingCourse: null,
  unenrollingCourse: null,
  updatingCourse: false,
  currentCourse: null,
  creatingActivity: false,
  deletingActivity: null,
  takingQuiz: null,
  submittingQuiz: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COURSES_START:
      return {
        ...state,
        error: false,
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
        ...state,
        loading: true,
        error: false,
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

    case actionTypes.LOAD_ACTIVITIES:
      return {
        ...state,
        loadingActivities: true,
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

    case actionTypes.CREATE_ACTIVITY_START:
      return {
        ...state,
        creatingActivity: true,
      };

    case actionTypes.CREATE_ACTIVITY_DONE:
      return {
        ...state,
        creatingActivity: false,
      };

    case actionTypes.DELETE_ACTIVITY_START:
      return {
        ...state,
        deletingActivity: action.payload,
      };

    case actionTypes.DELETE_ACTIVITY_DONE:
      return {
        ...state,
        deletingActivity: null,
      };

    case actionTypes.ADD_NEW_ACTIVITY:
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          activities: [action.payload, ...state.currentCourse.activities],
        },
      };

    case actionTypes.REMOVE_ACTIVITY:
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          activities: state.currentCourse.activities.filter(
            (activity) => activity.id !== action.payload,
          ),
        },
      };

    case actionTypes.TAKE_QUIZ_START:
      return {
        ...state,
        takingQuiz: action.payload,
      };

    case actionTypes.TAKE_QUIZ_DONE:
      return {
        ...state,
        takingQuiz: null,
      };

    case actionTypes.SUBMIT_QUIZ_START:
      return {
        ...state,
        submittingQuiz: true,
      };

    case actionTypes.SUBMIT_QUIZ_DONE:
      return {
        ...state,
        submittingQuiz: false,
      };

    case actionTypes.ADD_GRADE:
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          activities: state.currentCourse.activities.map((activity) => {
            if (activity.id === action.payload.quizId) {
              if (activity.grades.length > 0) {
                return {
                  ...activity,
                  grades:
                    activity.grades[0].grade > action.payload.grade
                      ? activity.grades
                      : [action.payload],
                };
              } else {
                return {
                  ...activity,
                  grades: [action.payload],
                };
              }
            }
            return activity;
          }),
        },
      };

    default:
      return state;
  }
};

export default reducer;
