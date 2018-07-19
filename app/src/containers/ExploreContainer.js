import React from 'react';
import ExploreSearch from '../components/ExploreSearch';
import ExploreFeed from '../components/ExploreFeed';

class ExploreContainer extends React.Component {

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