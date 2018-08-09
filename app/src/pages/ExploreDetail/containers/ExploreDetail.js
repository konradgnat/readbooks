// @flow

import * as React from 'react';
import type { TitleResults } from '../../../types/BooksAPI';
import styles from './ExploreDetail.css';

type Props = {
  location: {
    state: TitleResults
  }
};


export default class ExploreDetail extends React.Component<Props> {

  render() {
    let authors = '';
    if (this.props.location.state.volumeInfo.authors) {
      authors = this.props.location.state.volumeInfo.authors.join(', ');
    }

    return (
      <div id="main-title">
        <div className="content">
          <h1 className="ui header">{this.props.location.state.volumeInfo.title}</h1>
          <div className="meta">
            <div>
              <img src={this.props.location.state.volumeInfo.imageLinks ? this.props.location.state.volumeInfo.imageLinks.smallThumbnail : '/images/no_results.svg'} alt=""/>
              <div className={styles.detailMeta}>
                <span className="author">Authors: {authors}</span>
                <span className="date">Published: {this.props.location.state.volumeInfo.publishedDate}</span>

              </div>
            </div>
          </div>
        </div>
        <h4 className="ui header">Description</h4>
        <p>{this.props.location.state.volumeInfo.description}</p>
      </div>
    )
  }
};