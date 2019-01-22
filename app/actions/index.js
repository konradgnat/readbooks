import { FETCH_USER, FETCH_POSTS } from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPosts = userId => async dispatch => {
  const res = await axios.get(`/books/user/${userId}`);

  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const createPost = formValues => async(dispatch, getState) => {
  const userId = getState().auth.id;
  console.log('action pre', userId, getState().auth);
  const res = await axios.post('/books', { ...formValues, userId });
  console.log('action post', res.data);

  dispatch({ type: FETCH_POSTS, payload: res.data });
};
