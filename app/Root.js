import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import reduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import history from './util/history';

export default ({ children, initialState = {} }) => {
  return (
    <Provider store={createStore(reducers, initialState, applyMiddleware(reduxThunk))}>
      <Router history={history}>
        {children}
      </Router>
    </Provider>
  )
}