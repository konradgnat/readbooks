// @flow

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExploreContainer from './Explore.js';
import ExploreDetail from './ExploreDetail.js';
import Profile from './Profile.js';

type Props = {};

class Search extends React.Component<Props> {
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

const root = document.getElementById('search_root');

if (root !== null) {
  ReactDOM.render(<Search />, root);
}
