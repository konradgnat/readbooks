// @flow
import * as React from 'react';
import apiCaller from 'util/apiCaller';
import 'components/explore/Autocomplete.css';
import type { SearchResults } from 'types/Posts';

type Props = {
  currentIndex: number,
  query: string,
  onClick: (hit: string) => void,
  onSuggestions: (hits: Array<SearchResults>) => void,
  open: boolean
};

type State = {
  hits: Array<SearchResults>
};

class Autocomplete extends React.Component<Props, State> {
  node = null;

  constructor(props: Props): void {
    super(props);
    this.state = {
      hits: []
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.props.query !== prevProps.query) {
      if (this.props.query.trim() === '') {
        this.setState({ hits: [] });
        this.props.onSuggestions([]);
        return;
      }

      apiCaller(this.props.query).then(res => {
        this.setState({ hits: res.items || [] });
        this.props.onSuggestions(res.items);
      });
    }
  }

  handleClick = (e: MouseEvent): void => {
    if (this.node && e.target instanceof Node && this.node.contains(e.target)) {
      return;
    }

    this.setState({ hits: [] });
    this.props.onSuggestions([]);
  };

  renderHit = (hit: SearchResults): React.Element<'div'> => {
    const isSelected = (this.props.currentIndex > -1) 
      ? this.state.hits[this.props.currentIndex].id === hit.id 
      : false;

    const className = isSelected ? 'suggestion selected' : 'suggestion';
    const title = hit.volumeInfo.title;

    return (
      <div
        key={hit.id}
        role="option"
        onClick={() => this.props.onClick(hit.volumeInfo.title)}
        aria-selected={isSelected}
        className={className}
      >
        {title}
      </div>
    );
  };

  render() {
    const autocompleteStyle = {
      display: (!this.props.open || this.state.hits.length === 0) ? 'none' : 'block'
    };

    return (
      <div
        id="autoCompList"
        ref={node => (this.node = node)}
        role="list"
        className="autoCompList"
        style={autocompleteStyle}
      >
        {this.state.hits.map(this.renderHit)}
      </div>
    );
  }
}

export default Autocomplete;
