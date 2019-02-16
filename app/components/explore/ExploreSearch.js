// @flow

import React from 'react';
import './ExploreSearch.css';
import Autocomplete from '../Autocomplete';
import type { SearchResults } from '../../types/BooksAPI';

type Props = {
  handleSearch: (query: string) => void
};
type State = {
  query: string,
  value: string,
  currentIndex: number,
  open: boolean
};

class ExploreSearch extends React.Component<Props, State> {
  suggestions = [];

  onKeyDown = (event: KeyboardEvent): void => {
    const currentIndex = this.state.currentIndex;
    switch (event.key) {
      case 'ArrowDown':
        if (currentIndex < this.suggestions.length - 1)
          this.setState({ currentIndex: currentIndex + 1 });
        if (!this.state.open) this.setState({ open: true });
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (currentIndex > -1)
          this.setState({ currentIndex: currentIndex - 1 });
        else this.setState({ open: false });
        event.preventDefault();
        break;
      case 'Escape':
        this.setState({ open: false, currentIndex: -1 });
        event.preventDefault();
        break;
      case 'Enter':
        if (this.suggestions.length > 0 && currentIndex >= 0) {
          this.setState({
            value: this.suggestions[currentIndex].volumeInfo.title,
            open: false,
            currentIndex: -1
          });
          event.preventDefault();
        } else {
          this.performSearch(null);
        }
        break;
      default:
        return;
    }
  };

  onSuggestionClick = (hit: string): void => {
    this.setState({ value: hit, open: false, currentIndex: -1 });
    this.performSearch();
  };

  onSuggestions = (hits: Array<SearchResults>): void => {
    this.suggestions = hits;
    if (!this.state.open) this.setState({ open: true });
    this.setState({ currentIndex: -1 });
  };

  updateQuery = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    return this.setState({
      query: event.target.value,
      value: event.target.value
    });
  };

  performSearch = (
    event: ?SyntheticInputEvent<HTMLInputElement>
  ): void => {
    this.setState({ open: false });
    this.props.handleSearch(this.state.query);
    if (event) event.preventDefault();
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
      value: '',
      open: false,
      currentIndex: -1
    };
  }

  render() {
    return (
      <div className="search_container">
        <h3>Find your next favorite book!</h3>
        <div className="titleSearchWrapper">
          <label htmlFor="titleSearch" className="titleSearchLabel">
            Search:
          </label>
          <div className="autoCompWrapper">
            <input
              id="titleSearch"
              value={this.state.value}
              onKeyDown={this.onKeyDown}
              onChange={this.updateQuery}
              className="searchInput"
              type="search"
              autoComplete="off"
            />
            <Autocomplete
              currentIndex={this.state.currentIndex}
              query={this.state.query}
              onClick={this.onSuggestionClick}
              onSuggestions={this.onSuggestions}
              open={this.state.open}
            />
          </div>
          <button
            onClick={this.performSearch}
            type="submit"
            className="titleSearchSubmit"
            >
              <i className="circular search link icon"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ExploreSearch;
