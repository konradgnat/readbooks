
import React from 'react';
import styles from './ExploreSearch.css';
import Autocomplete from '../Autocomplete/Autocomplete';

type Props = {};
type State = {
  query: ?string,
}

class ExploreSearch extends React.Component<Props, State> {

  suggestions = [];

  onKeyDown(event: Event) {
    let currentIndex = this.state.currentIndex;
    switch(event.key) {
      case 'ArrowDown':
        if (currentIndex < this.suggestions.length-1) this.setState({currentIndex: ++currentIndex});
        if (!this.state.open) this.setState({open: true});
        break;
      case 'ArrowUp':
        if (currentIndex > -1) this.setState({currentIndex: --currentIndex});
        else this.setState({open:false});
        break;
      case 'Escape':
        this.setState({open: false, currentIndex: -1 });
        break;
      case 'Enter':
        this.setState({value: this.suggestions[currentIndex].volumeInfo.title, open: false, currentIndex: -1 })

    }
  };

  handleAutoCompClick(event: Event) {
    console.log(event.target);
  }

  onSuggestionClick = hit => {
    this.setState({ value: hit, open: false, currentIndex: -1 });
  };

  onSuggestions = hits => {
    this.suggestions = hits;
    if (!this.state.open) this.setState({open: true});
  };

  updateQuery = event => this.setState({ query: event.target.value, value: event.target.value });

  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
      value: '',
      open: false,
      currentIndex: -1
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.handleAutoCompClick = this.handleAutoCompClick.bind(this);
  }

  render() {
    return (
      <div className={styles.search_container}>
        <h3>Find interesting reads</h3>
        <div className={styles.titleSearchWrapper}>
          <label htmlFor="titleSearch" className={styles.titleSearchLabel}>Search By Title:</label>
          <div className={styles.autoCompWrapper}>
            <input id="titleSearch"
                   value={this.state.value}
                   onKeyDown={this.onKeyDown}
                   onChange={this.updateQuery}
                   className={styles.searchInput}
                   type="text"
                   autoComplete="off"
            />
            <Autocomplete currentIndex={this.state.currentIndex}
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