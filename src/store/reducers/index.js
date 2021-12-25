import { combineReducers } from 'redux';

import auth from './auth';
import admin from './admin';
import me from './me';
import create from './create';
import courses from './courses';
import comments from './comments';

export default combineReducers({
  auth,
  admin,
  me,
  create,
  courses,
  comments,
});
