import authReducer from 'reducers/authReducer';
import postsReducer from 'reducers/postsReducer';
import profileReducer from 'reducers/profileReducer';
import followsReducer from 'reducers/followsReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  profile: profileReducer,
  follow: followsReducer
});
