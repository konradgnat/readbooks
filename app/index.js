// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import Root from 'Root';


if (root !== null) {
  ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.getElementById('root')
  );
}
