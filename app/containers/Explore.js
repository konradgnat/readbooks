// @flow

import React from 'react';
import ExploreSearch from '../components/explore/ExploreSearch';
import ExploreFeed from '../components/explore/ExploreFeed';
import apiCaller from '../util/apiCaller';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';
import type { TitleResults } from '../types/BooksAPI';

type Props = {};

type State = {
  searchHits: Array<TitleResults>,
  query: string
};

class ExploreContainer extends React.Component<Props, State> {
  handleSearch = (query: string): void => {
    apiCaller(query).then(res => {
      this.setState({ searchHits: res.items || [] });
    });
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      searchHits: [],
      query: ''
    };
  }

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
