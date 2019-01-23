// @flow

'use strict';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ExploreContainer from './explore/Explore.js';
import ExploreDetail from './explore/ExploreDetail.js';
import PostCreate from '../components/books/PostCreate';
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
          <Route exact path="/post/create" component={PostCreate} />
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
