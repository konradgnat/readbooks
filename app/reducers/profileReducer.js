import { FETCH_PROFILE } from '../actions/types';

export default function(state = [], action) {

  switch (action.type) {
    case FETCH_PROFILE:
      console.log('f prof', action.payload);
      return action.payload || [];
    default:
      return state;
  }
}