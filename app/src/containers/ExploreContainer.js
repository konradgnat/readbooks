// @flow

import React from 'react';
import ExploreSearch from '../components/ExploreSearch/ExploreSearch';
import ExploreFeed from '../components/ExploreFeed/ExploreFeed';

type Props = {};

class ExploreContainer extends React.Component<Props> {

  render() {
    return (
      <div>
        <ExploreSearch />
        <ExploreFeed />
      </div>
    )
  }
}

export default ExploreContainer;