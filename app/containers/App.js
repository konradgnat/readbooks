// @flow
import React from 'react';
import { Route, Router } from 'react-router-dom';
import ExploreContainer from 'containers/ExploreContainer';
import PostShow from 'components/post/PostShow';
import PostCreate from 'components/post/PostCreate';
import ProfileContainer from 'containers/ProfileContainer';
import { connect } from 'react-redux';
import * as actions from 'actions';
import 'react-notifications/lib/notifications.css';
import history from '../util/history';

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
            render={props => <ProfileContainer key={props.location.key} />}
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
