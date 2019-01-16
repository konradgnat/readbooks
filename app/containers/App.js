// @flow

'use strict';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ExploreContainer from './Explore.js';
import ExploreDetail from './ExploreDetail.js';
import CreateBook from '../components/books/CreateBook';
import Profile from './Profile.js';
import { connect } from 'react-redux';
import * as actions from '../actions';

type Props = {};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/explore/:id" component={ExploreDetail} />
          <Route exact path="/explore" component={ExploreContainer} />
          <Route exact path="/book/create" component={CreateBook} />
          <Route path="/profile" component={Profile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
