import authReducer from './authReducer';
import postsReducer from './postsReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer
});
