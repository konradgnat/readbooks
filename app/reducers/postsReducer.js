import { FETCH_POSTS } from '../actions/types';

export default function(state = [], action) {
  console.log('red state', state);

  switch (action.type) {
    case FETCH_POSTS:
      return action.payload || [];
    default:
      return state;
  }
}
