import { FETCH_USER_FOLLOWERS } from '../actions/types';

export default function(state = [], action) {

  switch (action.type) {
    case FETCH_USER_FOLLOWERS:
      return action.payload || [];
    default:
      return state;
  }
}
