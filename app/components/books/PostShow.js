// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import type { TitleResults } from '../../types/BooksAPI';
import styles from './PostShow.css';

type Props = {
  location: {
    state: TitleResults
  }
};

export default class PostShow extends React.Component<Props> {

  render() {
    let title = '';
    let publishedDate = '';
    let imageUrl = '/images/no_results.svg';
    let authors = '';
    if (this.props.location.state) {
      title = this.props.location.state.volumeInfo.title;
      publishedDate = this.props.location.state.volumeInfo.publishedDate;
      imageUrl = this.props.location.state.volumeInfo.imageLinks.smallThumbnail;
      authors = this.props.location.state.volumeInfo.authors.join(', ');
    }

    const addLink = {
      pathname: "/post/create",
      state: this.props.location.state
    };

    return (
      <div className="segment">
        <div className="ui items">
          <div className="ui item">
            <div className="ui tiny-image">
              <img src={imageUrl} className={styles.detailImage} alt="" />
            </div>
            <div className={styles.detailContent}>
              <div className="content">
                <h1 className="ui header">{title}</h1>
                <Link to={addLink} className="ui mini positive basic button">
                  Add Book
                </Link>
                <div className="meta">
                  <span className={styles.detailMeta}>Authors: {authors}</span>
                  <span className={styles.detailMeta}>
                    Published: {publishedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 className="ui header">Description</h4>
        <p>{this.props.location.state.volumeInfo.description}</p>
      </div>
    );
  }
}
