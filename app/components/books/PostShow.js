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

  togglePostForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  renderForm = () => {
    if (this.state.showForm) {
      return (
        <PostCreate bookData={this.props.location.state}/>
      )
    }
  };

  renderButton() {
    if (!this.state.showForm) {
      return (
        <a onClick={this.togglePostForm} className="ui mini positive basic button">
          Add Book
        </a>
      );
    }

    return (
      <button onClick={this.togglePostForm} className="ui tiny red basic button post__cancel">
        Cancel
      </button>
    );
  };

  render() {
    const book = this.props.location.state;

    return (
      <div className="segment">
        <div className="ui items">
          <div className="ui item">
            <div className="ui tiny-image">
              <img src={book.thumbnail} className={styles.detailImage} alt="" />
            </div>
            <div className={styles.detailContent}>
              <div className="content">
                <h1 className="ui header">{book.title}</h1>
                <div className="meta">
                  <span className={styles.detailMeta}>Authors: {book.authors}</span>
                  <span className={styles.detailMeta}>
                    Published: {book.publishedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui content">
          {this.renderForm()}
          {this.renderButton()}
        </div>
        <h4 className="ui header">Description</h4>
        <p>{book.description}</p>
      </div>
    );
  }
}
