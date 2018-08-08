// @flow

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExploreContainer from './pages/Explore/containers/Explore.js';
import ExploreDetail from './pages/ExploreDetail/containers/ExploreDetail.js';

type Props = {};

class Search extends React.Component<Props> {

  render() {
    console.log('heres app.js');
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/explore" component={ExploreContainer} />
          <Route path="/explore/:id" component={ExploreDetail} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const root = document.getElementById('search_root');

if (root !== null) {
  ReactDOM.render( <Search/>, root);
}
