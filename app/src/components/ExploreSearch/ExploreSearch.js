// @flow

import React from 'react';
import style from './ExploreSearch.css';

type Props = {};

class ExploreSearch extends React.Component<Props, {keyword: ?string}> {

  constructor(props: Props) {
    super(props);
    // (this: any).handleChange = this.handleChange.bind(this);

    this.state = {
      keyword: ''
    };
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ keyword: event.target.value });
  };


  render() {
    return (
      <div className={ style.search_container }>
        <h3>Find interesting reads</h3>
        <input onChange={this.handleChange} className={ style.search_input } type="text"/>
      </div>
    )
  }
}

export default ExploreSearch;