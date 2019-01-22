import { FETCH_POSTS, CREATE_POST } from '../actions/types';

export default function(state = [], action) {
  console.log('reducer', state, action.payload);

  switch (action.type) {
    case FETCH_POSTS:
      return action.payload || [];
    case CREATE_POST:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
