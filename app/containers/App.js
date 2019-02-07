// @flow

import React from 'react';
import { Router, Route } from 'react-router-dom';
import ExploreContainer from './Explore';
import PostShow from '../components/post/PostShow';
import PostCreate from '../components/post/PostCreate';
import history from '../util/history';
import Profile from './Profile';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'react-notifications/lib/notifications.css';

type Props = {
  fetchUser: Function
};

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
          <Route
            exact
            path="/profile/:id"
            // this allows the component to refresh when the route param changes
            render={props => <Profile key={props.location.key} />}
          />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  actions
)(App);
