// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { ProccessedSearchResult } from '../../types/Posts';
import './PostShow.css';
import PostCreate from './PostCreate';

type Props = {
  location: {
    state: ProccessedSearchResult
  },
  auth: null|boolean|Object
};

type State = {
  showForm: boolean
};

class PostShow extends React.Component<Props, State> {
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
      if (!this.props.auth) {
        return (
          <a href='/login' className="ui mini positive basic button">
            Login To Post
          </a>
        );
      }

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
              <img src={book.thumbnail} className="detailImage" alt="" />
            </div>
            <div className="detailContent">
              <div className="content">
                <h1 className="ui header">{book.title}</h1>
                <div className="meta">
                  <span className="detailMeta">Authors: {book.authors}</span>
                  <span className="detailMeta">
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
        <p dangerouslySetInnerHTML={{ __html: book.description }}></p>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, null)(PostShow);