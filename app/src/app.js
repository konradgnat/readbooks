// @flow

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ExploreContainer from './pages/Explore/containers/ExploreContainer.js';

type Props = {};

class Search extends React.Component<Props> {

  render() {
    return (
      <ExploreContainer />
    )
  }
}

const root = document.getElementById('search_root');

if (root !== null) {
  ReactDOM.render( <Search/>, root);
}
