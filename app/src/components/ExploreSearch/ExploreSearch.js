// @flow

import React from 'react';
import style from './ExploreSearch.css';
import apiCaller from '../../util/apiCaller';
import algoliasearch from "algoliasearch";

import Autocomplete from "algolia-react-autocomplete";
import "algolia-react-autocomplete/build/css/index.css";

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
    // (this: any).handleChange = this.handleChange.bind(this);
    // (this: any).handleAutoCompClick = this.handleAutoCompClick.bind(this);


    this.client = algoliasearch(
      "latency",
      "6be0576ff61c053d5f9a3225e2a90f76" // search-only api key
    );

    let pindex = this.client.initIndex("players");

    pindex.setSettings({ hitsPerPage:  10 }, function(err, content) {
      if (err) throw err;

      console.log('inside setSettings', content);
    });

    this.indexes = [
      {
        source: pindex,
        displayKey: 'name',
        templates: {
          header: () => <h2 className="aa-suggestions-category"> Players</h2>
        },
        hitsPerPage: 4
      },
      {
        source: this.client.initIndex("teams"),
        displayKey: 'name',
        templates: {
          header: () => <h2 className="aa-suggestions-category">Teams</h2>,
          suggestion: (props, isSelected) => <li>{props.name}</li>
        },
        hitsPerPage: 4
      }
    ];
  }
  //
  // handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
  //   this.setState({ keyword: event.target.value }, () => {
  //     if (this.state.keyword.trim() === '') {
  //       this.setState({ list: [] });
  //
  //       return;
  //     }
  //
  //     apiCaller(this.state.keyword)
  //       .then((res) => {
  //         if (!this.state.keyword.trim()) return;
  //         this.setState({ list: res.items || [] });
  //       })
  //   });
  //   console.log(this.state.list);
  // };
  //
  // handleAutoCompClick(event) {
  //   console.log(event.target);
  // }
  //
  // renderAutocomplete() {
  //   console.log(this.state.list);
  //   if (this.state.list.length !== 0) {
  //     console.log(this.state.list);
  //     const autoCompList = this.state.list.map(item => {
  //       let title = item.volumeInfo.title;
  //       if (title.length > 34) {
  //         title = title.slice(0,34);
  //         title = title.split(' ').slice(0, -1).join(' ') + ' ...';
  //       }
  //       return <option onClick={ this.handleAutoCompClick } className={ style.autoCompListItem } key={item.id}>{title}</option>;
  //     });
  //
  //     return (
  //       <div className={ style.autoCompContainer }>
  //         <datalist id="query" className={ style.autoCompList }>
  //           { autoCompList }
  //         </datalist>
  //       </div>
  //     )
  //   }
  //
  //   return null;
  // }

  render() {
    return (
      <div className={ style.search_container }>
        <h3>Find interesting reads</h3>
        {/*<input list="query" onInput={this.handleChange} className={ style.search_input } type="text"/>*/}
        {/*{ this.renderAutocomplete() }*/}

        <Autocomplete
          indexes={this.indexes}
          onSelectionChange={this.onSelectionChange}
        >
          <input
            key="input"
            type="search"
            id="aa-search-input"
            className="aa-input-search"
            placeholder="Search for players or teams..."
            name="search"
            autoComplete="off"
          />
          <svg className="aa-input-icon" viewBox="654 -372 1664 1664">
            <path d="M1806,332c0-123.3-43.8-228.8-131.5-316.5C1586.8-72.2,1481.3-116,1358-116s-228.8,43.8-316.5,131.5  C953.8,103.2,910,208.7,910,332s43.8,228.8,131.5,316.5C1129.2,736.2,1234.7,780,1358,780s228.8-43.8,316.5-131.5  C1762.2,560.8,1806,455.3,1806,332z M2318,1164c0,34.7-12.7,64.7-38,90s-55.3,38-90,38c-36,0-66-12.7-90-38l-343-342  c-119.3,82.7-252.3,124-399,124c-95.3,0-186.5-18.5-273.5-55.5s-162-87-225-150s-113-138-150-225S654,427.3,654,332  s18.5-186.5,55.5-273.5s87-162,150-225s138-113,225-150S1262.7-372,1358-372s186.5,18.5,273.5,55.5s162,87,225,150s113,138,150,225  S2062,236.7,2062,332c0,146.7-41.3,279.7-124,399l343,343C2305.7,1098.7,2318,1128.7,2318,1164z" />
          </svg>
        </Autocomplete>
      </div>
    )
  }
}

export default ExploreSearch;