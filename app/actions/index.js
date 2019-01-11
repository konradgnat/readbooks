import { FETCH_USER } from './types';
import { FETCH_POSTS } from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPosts = userId => async dispatch => {
  const res = await axios.get(`/books/user/${userId}`);

  dispatch({ type: FETCH_POSTS, payload: res.data });
};
