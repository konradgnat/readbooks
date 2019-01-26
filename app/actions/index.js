import { FETCH_USER, FETCH_POSTS, CREATE_POST } from './types';
import axios from 'axios';
import history from '../util/history';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPosts = userId => async dispatch => {
  const res = await axios.get(`/books/user/${userId}`);

  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const createPost = formValues => async(dispatch, getState) => {
  const userId = getState().auth._id;
  const res = await axios.post('/books', { ...formValues, userId });

  dispatch({ type: CREATE_POST, payload: res.data });

  history.push('/profile');
};
