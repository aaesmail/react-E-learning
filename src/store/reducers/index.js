import { combineReducers } from 'redux';

import auth from './auth';
import admin from './admin';
import me from './me';

export default combineReducers({
  auth,
  admin,
  me,
});
