// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { ProccessedSearchResult } from 'types/Posts';
import 'components/post/PostShow.css';
import PostCreate from 'components/post/PostCreate';

type Props = {
  location: {
    state: ProccessedSearchResult
  },
  auth: null|boolean|Object
};

type State = {
  showForm: boolean
};

export class PostShow extends React.Component<Props, State> {
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
        <a
          onClick={this.togglePostForm}
          className="ui mini positive basic button"
        >
          Add Book
        </a>
      );
    }

    return (
      <button
        onClick={this.togglePostForm}
        className="ui tiny red basic button post__cancel"
      >
        Cancel
      </button>
    );
  };

  render() {
    const {
      thumbnail,
      title,
      authorsJoined,
      formattedPubDate,
      description
    } = this.props.location.state;

    return (
      <div className="segment">
        <div className="ui items">
          <div className="ui item">
            <div className="ui tiny-image">
              <img src={thumbnail} className="detailImage" alt="" />
            </div>
            <div className="detailContent">
              <div className="content">
                <h1 className="ui header">{title}</h1>
                <div className="meta">
                  <span className="detailMeta">Authors: {authorsJoined}</span>
                  <span className="detailMeta">
                    Published: {formattedPubDate}
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
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, null)(PostShow);