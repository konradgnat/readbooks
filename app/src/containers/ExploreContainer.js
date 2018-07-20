import React from 'react';
import ExploreSearch from '../components/ExploreSearch/ExploreSearch';
import ExploreFeed from '../components/ExploreFeed/ExploreFeed';

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