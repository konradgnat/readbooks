import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import reduxThunk from 'redux-thunk';

export default ({ children, initialState = {} }) => {
  return (
    <Provider store={createStore(reducers, initialState, applyMiddleware(reduxThunk))}>
        {children}
    </Provider>
  )
}