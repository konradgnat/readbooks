import { FETCH_USER_FOLLOWERS, FETCH_USER_FOLLOWING } from '../actions/types';

const INITIAL_STATE = {
  followers: [],
  following: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_FOLLOWERS:
      return { ...state, followers: action.payload || [] };
    case FETCH_USER_FOLLOWING:
      return { ...state, following: action.payload || [] };
    default:
      return state;
  }
}
