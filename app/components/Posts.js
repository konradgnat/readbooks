// @flow
import * as React from 'react';
import axios from 'axios';

export default class Posts extends React.Component<> {
  componentDidMount() {
    console.log(' Posts render ');
    axios.get('/books/user/59e033bab6d54d54eb3e0bd4').then(res => {
      console.log('res = ', res);
    });
  }

  render() {
    return (
      <div>
        <h1>Posts Tab here</h1>
      </div>
    );
  }
}
