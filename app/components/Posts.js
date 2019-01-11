// @flow
import * as React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import styles from './Posts.css';

class Posts extends React.Component<> {
  componentDidMount() {
    if (!this.props.auth) return;

    this.props.fetchPosts(this.props.auth._id);
  }

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div className={'item ' + styles.profile__post}>
          <div className={'ui tiny image ' + styles.profile__img_wrapper}>
            <img
              className={'book_thumbnail ' + styles.profile__img}
              src={post.thumbnail}
            />
          </div>
          <div className="content">
            <div className="header">{post.title}</div>
            <div>{post.thoughts.substring(0, 100) + '...'}</div>
            <a href={`/books/${post._id}`}>read more</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderPosts()}</div>;
  }
}

function mapStateToProps(state) {
  return { posts: state.posts, auth: state.auth };
}
export default connect(
  mapStateToProps,
  actions
)(Posts);
