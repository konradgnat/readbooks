// @flow
import React from 'react';
import 'components/explore/ExploreSearch.css';
import Autocomplete from 'components/explore/Autocomplete';
import type { SearchResults } from 'types/Posts';

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
  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
      value: '',
      open: false,
      suggestions: [],
      currentIndex: -1
    };
  }

  onKeyDown = (event: KeyboardEvent): void => {
    const { currentIndex } = this.state;
    switch (event.key) {
      case 'ArrowDown':
        if (currentIndex < this.state.suggestions.length - 1) {
          this.setState({ currentIndex: currentIndex + 1 });
        }
        if (!this.state.open) {
          this.setState({ open: true });
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (currentIndex > -1) {
          this.setState({ currentIndex: currentIndex - 1 });
        } else {
          this.setState({ open: false });
        }
        event.preventDefault();
        break;
      case 'Escape':
        this.setState({ open: false, currentIndex: -1 });
        event.preventDefault();
        break;
      case 'Enter':
        if (this.state.suggestions.length > 0 && currentIndex >= 0) {
          this.setState({
            value: this.state.suggestions[currentIndex].volumeInfo.title,
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
    this.setState({ currentIndex: -1, suggestions: hits, open: true });
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

  render() {
    return (
      <div className="search_container">
        <h3>Find your next favorite book!</h3>
        <div className="titleSearchWrapper">
          <label htmlFor="titleSearch" className="titleSearchLabel">
            Search:
          </label>
          <div className="search__input_wrapper">
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
              className="search__submit"
            >
              <i className="circular search link icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreSearch;
