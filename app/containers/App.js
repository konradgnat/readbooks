// @flow

import React from 'react';
import { Router, Route } from 'react-router-dom';
import ExploreContainer from './Explore';
import PostShow from '../components/books/PostShow';
import PostCreate from '../components/books/PostCreate';
import history from '../util/history';
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
      <Router history={history}>
        <div>
          <Route exact path="/explore/:id" component={PostShow} />
          <Route exact path="/explore" component={ExploreContainer} />
          <Route exact path="/post/create" component={PostCreate} />
          <Route exact path="/profile/:id" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  actions
)(App);
