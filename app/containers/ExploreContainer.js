// @flow
import React from 'react';
import ExploreSearch from 'components/explore/ExploreSearch';
import ExploreFeed from 'components/explore/ExploreFeed';
import bookSearch from 'util/apiCaller';
import { connect } from 'react-redux';
import * as actions from 'actions';
import type { SearchResults } from 'types/Posts';

type Props = {};

type State = {
  searchHits: Array<SearchResults>
};

export class ExploreContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchHits: []
    };
  }

  handleSearch = (query: string): void => {
    bookSearch(query).then(res => {
      this.setState({ searchHits: res.items || [] });
    });
  };

  render() {
    return (
      <div>
        <ExploreSearch handleSearch={this.handleSearch} />
        <ExploreFeed searchHits={this.state.searchHits} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(ExploreContainer);
