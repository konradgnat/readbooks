// @flow

import * as React from 'react';
import type { TitleResults } from '../../../types/BooksAPI';

type Props = {
  location: {
    state: TitleResults
  }
};


export default class ExploreDetail extends React.Component<Props> {

  render() {
    return (
      <h1>
        {this.props.location.state.volumeInfo.title}</h1>
    )
  }
}