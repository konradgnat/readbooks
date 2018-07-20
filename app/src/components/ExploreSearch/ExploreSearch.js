import React from 'react';
import style from './ExploreSearch.css';

class ExploreSearch extends React.Component {

  render() {
    return (
      <div className={ style.search_container }>
        <h3>Find interesting reads</h3>
        <input className={ style.search_input } type="text"/>
      </div>
    )
  }
}

export default ExploreSearch;