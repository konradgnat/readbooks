// @flow

'use strict';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExploreContainer from './Explore.js';
import ExploreDetail from './ExploreDetail.js';
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
        <Switch>
          <Route path="/explore/:id" component={ExploreDetail} />
          <Route path="/explore" component={ExploreContainer} />
          <Route
            path="/profile"
            render={() => <Profile appData={window.appData} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
