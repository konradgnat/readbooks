'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ExploreContainer from './containers/ExploreContainer.js';

class Search extends React.Component {

  render() {
    return (
      <ExploreContainer />
    )
  }
}

ReactDOM.render(<Search/>, document.getElementById('search_root'));