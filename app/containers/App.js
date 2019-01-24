// @flow

'use strict';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ExploreContainer from './Explore';
import PostShow from '../components/books/PostShow';
import PostCreate from '../components/books/PostCreate';
import Profile from './Profile';
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
          <Route exact path="/explore/:id" component={PostShow} />
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
