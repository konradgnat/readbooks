// @flow

import * as React from 'react';
import apiCaller from '../util/apiCaller';
import './Autocomplete.css';
import type { TitleResults } from '../types/BooksAPI';

type Props = {
  currentIndex: number,
  query: string,
  onClick: (hit: string) => void,
  onSuggestions: (hits: Array<TitleResults>) => void,
  open: boolean
};

type State = {
  hits: Array<TitleResults>
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
    document.addEventListener('mousedown', this.handleClick, false);
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

  renderHit = (hit: TitleResults): React.Element<'div'> => {
    let isSelected = false;
    if (this.props.currentIndex > -1)
      isSelected = this.state.hits[this.props.currentIndex].id === hit.id;
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
    const style = {};
    if (
      !this.props.open ||
      !this.state.hits ||
      (this.state.hits && this.state.hits.length === 0)
    ) {
      style.display = 'none';
    }
    return (
      <div
        ref={node => (this.node = node)}
        role="list"
        className="autoCompList"
        style={style}
      >
        {this.state.hits.map(this.renderHit)}
      </div>
    );
  }
}

export default Autocomplete;
