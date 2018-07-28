
import React from 'react';
import style from './ExploreSearch.css';
import apiCaller from '../../util/apiCaller';
import Autocomplete from '../Autocomplete/Autocomplete';

type Props = {};
type State = {
  query: ?string,
  list: ?Array<mixed>
}

class ExploreSearch extends React.Component<Props, State> {

  onKeyDown(event: Event) {
    this.setState({ query: event.target.value }, () => {
      if (this.state.query.trim() === '') {
        this.setState({ list: [] });

        return;
      }

      apiCaller(this.state.query)
        .then((res) => {
          if (!this.state.query.trim()) return;
          this.setState({ list: res.items || [] });
        })
    });
    console.log(this.state.list);
  };

  handleAutoCompClick(event: Event) {
    console.log(event.target);
  }

  updateQuery = event => this.setState({ query: event.target.value, value: event.target.value });

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

        return (
          <li onClick={ this.handleAutoCompClick } className={ style.autoCompListItem } key={item.id}>
            {title}
          </li>
        );
      });

      return (
        <div className={ style.autoCompContainer }>
          <ul id="query" className={ style.autoCompList }>
            { autoCompList }
          </ul>
        </div>
      )
    }

    return null;
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
      value: '',
      list: []
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.handleAutoCompClick = this.handleAutoCompClick.bind(this);
  }

  render() {
    return (
      <div className={ style.search_container }>
        <h3>Find interesting reads</h3>
        <input list="query" onKeyDown={ this.onKeyDown } onChange={ this.updateQuery } className={ style.search_input } type="text"/>
        <Autocomplete query={ this.state.query } />
      </div>
    )
  }
}

export default ExploreSearch;