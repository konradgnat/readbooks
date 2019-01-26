import authReducer from './authReducer';
import postsReducer from './postsReducer';
import profileReducer from './profileReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  profile: profileReducer
});
