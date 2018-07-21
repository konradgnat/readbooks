// @flow

import React from 'react';
import style from './ExploreSearch.css';
import apiCaller from '../../util/apiCaller';

type Props = {};
type State = {
  keyword: ?string,
  list: ?Array<mixed>
}

class ExploreSearch extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      keyword: '',
      list: []
    };
    (this: any).handleChange = this.handleChange.bind(this);
  }

  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ keyword: event.target.value }, () => {
      if (this.state.keyword.trim() === '') {
        this.setState({ list: [] });

        return;
      }

      apiCaller(this.state.keyword)
        .then((res) => {
          if (!this.state.keyword.trim()) return;
          this.setState({ list: res.items || [] });
        })
    });
    console.log(this.state.list);
  };

  renderAutocomplete() {
    console.log(this.state.list);
    if (this.state.list.length !== 0) {
      console.log(this.state.list);
      const autoCompList = this.state.list.map(item => {
        return <li className={ style.autoCompListItem } key={item.id}>{item.volumeInfo.title}</li>;
      });

      return (
        <div className={ style.autoCompContainer }>
          <ul className={ style.autoCompList }>
            { autoCompList }
          </ul>
        </div>
      )
    }

    return null;
  }

  render() {
    return (
      <div className={ style.search_container }>
        <h3>Find interesting reads</h3>
        <input onInput={this.handleChange} className={ style.search_input } type="text"/>
        { this.renderAutocomplete() }
      </div>
    )
  }
}

export default ExploreSearch;