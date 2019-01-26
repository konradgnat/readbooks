// @flow
import * as React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Post from './Post';

class Posts extends React.Component<> {
  componentDidMount() {
    this.props.fetchPosts(this.props.id);
  }

  renderPosts() {
    if (!this.props.posts) {
      return;
    }

    return this.props.posts.map(post => {
      return <Post post={post} />;
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
