'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Feed extends React.Component {


  render() {
    return (
      <h1>
        Hello World
      </h1>
    )
  }
}

ReactDOM.render(<Feed/>, document.getElementById('app_root'));