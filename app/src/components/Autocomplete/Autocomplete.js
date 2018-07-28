

import React from 'react';
import apiCaller from '../../util/apiCaller';
import styles from './Autocomplete.css';
import classNames from 'classnames/bind';

class Autocomplete extends React.Component {

  cx = classNames.bind(styles);

  constructor(props) {
    super(props);
    this.state = {
      hits: [],
    };
    console.log(styles);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {

      if (this.props.query.trim() === '') {
        this.setState({ hits: [] });
        this.props.onSuggestions([]);
        return;
      }

      apiCaller(this.props.query)
        .then((res) => {
          this.setState({ hits: res.items || [] });
          this.props.onSuggestions(res.items);
        })
    }
  }

  renderHit = hit => {
    let isSelected = false;
    if (this.props.currentIndex > -1) isSelected = this.state.hits[this.props.currentIndex].id === hit.id;
    let className = this.cx({
      suggestion: true,
      selected: isSelected
    });
    let title = hit.volumeInfo.title;
    if (title.length > 34) {
      title = title.slice(0,34);
      title = title.split(' ').slice(0, -1).join(' ') + ' ...';
    }

    return (
      <div key={hit.id}
           role="option"
           onClick={() => this.props.onClick(hit.volumeInfo.title)}
           aria-selected={isSelected}
           className={className}
      >
        {title}
      </div>
    )
  };

  render() {
    const style = {};
    if (!this.props.open || this.state.hits.length === 0) {
      style.display = 'none';
    }
    return (
      <div role="list" className={styles.autoCompList} style={style}>
        {this.state.hits.map(this.renderHit)}
      </div>
    )
  }
}

export default Autocomplete;