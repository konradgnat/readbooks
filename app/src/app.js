'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {

  render() {
    return (
      <div>
        <h3>Find interesting reads</h3>
        <input type="text"/>
      </div>
    )
  }
}

ReactDOM.render(<Search/>, document.getElementById('search_root'));