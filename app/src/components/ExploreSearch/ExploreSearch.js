// @flow

import React from 'react';
import style from './ExploreSearch.css';
import apiCaller from '../../util/apiCaller';
import AgAutocomplete from './AgAutocomplete.js';

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
    (this: any).handleAutoCompClick = this.handleAutoCompClick.bind(this);
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

  handleAutoCompClick(event) {
    console.log(event.target);
  }

  renderAutocomplete() {
    console.log(this.state.list);
    if (this.state.list.length !== 0) {
      console.log(this.state.list);
      const autoCompList = this.state.list.map(item => {
        let title = item.volumeInfo.title;
        if (title.length > 34) {
          title = title.slice(0,34);
          title = title.split(' ').slice(0, -1).join(' ') + ' ...';
        }
        return <option onClick={ this.handleAutoCompClick } className={ style.autoCompListItem } key={item.id}>{title}</option>;
      });

      return (
        <div className={ style.autoCompContainer }>
          <datalist id="query" className={ style.autoCompList }>
            { autoCompList }
          </datalist>
        </div>
      )
    }

    return null;
  }

  render() {
    return (
      <div className={ style.search_container }>
        <h3>Find interesting reads</h3>
        <input list="query" onInput={this.handleChange} className={ style.search_input } type="text"/>
        { this.renderAutocomplete() }
        
        <AgAutocomplete apiKey="6be0576ff61c053d5f9a3225e2a90f76"
                        appId="latency" displayKey="name" indices={[{index: 'contacts'}]}
                        inputId="input-search"
        />
      </div>
    )
  }
}

export default ExploreSearch;