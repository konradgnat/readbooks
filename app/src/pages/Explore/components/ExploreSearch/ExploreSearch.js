// @flow

import React from 'react';
import styles from './ExploreSearch.css';
import Autocomplete from '../Autocomplete/Autocomplete';
import type { TitleResults } from '../../../../types/BooksAPI';

type Props = {};
type State = {
  query: string,
  value: string,
  currentIndex: number,
  open: boolean
}

class ExploreSearch extends React.Component<Props, State> {

  suggestions = [];

  onKeyDown = (event: KeyboardEvent) => {
    let currentIndex = this.state.currentIndex;
    switch(event.key) {
      case 'ArrowDown':
        if (currentIndex < this.suggestions.length - 1) this.setState({currentIndex: currentIndex + 1});
        if (!this.state.open) this.setState({open: true});
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (currentIndex > -1) this.setState({currentIndex: currentIndex - 1});
        else this.setState({open:false});
        event.preventDefault();
        break;
      case 'Escape':
        this.setState({open: false, currentIndex: -1 });
        event.preventDefault();
        break;
      case 'Enter':
        if (this.suggestions.length > 0 && currentIndex >= 0) {
          this.setState({value: this.suggestions[currentIndex].volumeInfo.title, open: false, currentIndex: -1 });
          event.preventDefault();
        }
        break;
      default:
        return;
    }
  };

  onSuggestionClick = (hit: string) => {
    this.setState({ value: hit, open: false, currentIndex: -1 });
  };

  onSuggestions = (hits: Array<TitleResults>) => {
    this.suggestions = hits;
    if (!this.state.open) this.setState({open: true});
    this.setState({ currentIndex: -1 });
  };

  updateQuery = (event: SyntheticInputEvent<HTMLInputElement>) => {
    return this.setState({ query: event.target.value, value: event.target.value });
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
      <div className={styles.search_container}>
        <h3>Find interesting reads</h3>
        <div className={styles.titleSearchWrapper}>
          <label htmlFor="titleSearch" className={styles.titleSearchLabel}>Search By Title:</label>
          <div className={styles.autoCompWrapper}>
            <input
              id="titleSearch"
              value={this.state.value}
              onKeyDown={this.onKeyDown}
              onChange={this.updateQuery}
              className={styles.searchInput}
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
          <input type="submit" value="submit" className={styles.titleSearchSubmit}/>
        </div>
      </div>
    )
  }
}

export default ExploreSearch;