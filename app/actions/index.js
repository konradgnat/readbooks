import {
  FETCH_USER,
  FETCH_POSTS,
  CREATE_POST,
  FETCH_PROFILE,
  FETCH_USER_FOLLOWERS,
  FETCH_USER_FOLLOWING
} from './types';
import axios from 'axios';
import history from '../util/history';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPosts = userId => async dispatch => {
  const res = await axios.get(`/posts/user/${userId}`);

  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const createPost = formValues => async(dispatch, getState) => {
  const userId = getState().auth._id;
  const res = await axios.post('/posts', { ...formValues, userId });

  dispatch({ type: CREATE_POST, payload: res.data });

  history.push(`/profile/${userId}`);
};

export const fetchProfile = userId => async dispatch => {
  const res = await axios.get(`/profile/api/${userId}`);

  dispatch({ type: FETCH_PROFILE, payload: res.data });
};

export const fetchUserFollowers = (userId) => async dispatch => {
  const res = await axios.get(`/profile/${userId}/followers`);

  dispatch({ type: FETCH_USER_FOLLOWERS, payload: res.data });
};

export const fetchUserFollowing = (userId) => async dispatch => {
  const res = await axios.get(`/profile/${userId}/following`);

  dispatch({ type: FETCH_USER_FOLLOWING, payload: res.data });
};