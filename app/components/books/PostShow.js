// @flow

import * as React from 'react';
import type { TitleResults } from '../../types/BooksAPI';
import styles from './PostShow.css';
import PostCreate from './PostCreate';

type Props = {
  location: {
    state: TitleResults
  }
};

export default class PostShow extends React.Component<Props> {
  state = { showForm: false };

  handleAddBook = () => {
    this.setState({ showForm: !this.state.showForm });
    console.log(this.state);
  };

  renderForm = () => {
    if (this.state.showForm) {
      return (
        <PostCreate />
      )
    }
  };

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
        <div className="ui content">
          <a onClick={this.handleAddBook} className="ui mini positive basic button">
            Add Book
          </a>
          <div className="ui content">
            {this.renderForm()}
          </div>
        </div>
        <h4 className="ui header">Description</h4>
        <p>{this.props.location.state.volumeInfo.description}</p>
      </div>
    );
  }
}
