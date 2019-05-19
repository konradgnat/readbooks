import { FETCH_POSTS, CREATE_POST } from 'actions/types';

export default function(state = [], action) {

  switch (action.type) {
    case FETCH_POSTS:
      return action.payload || [];
    case CREATE_POST:
      return state;
    default:
      return state;
  }
}
