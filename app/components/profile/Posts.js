// @flow
import * as React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Post from './Post';

type Props = {
  fetchPosts: function,
  posts: [],
  auth: boolean,
  id: string
};

class Posts extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPosts(this.props.id);
  }

  renderPosts() {
    if (!this.props.posts) {
      return;
    }

    if (this.props.posts.length === 0) {

      return (
        <div className="item">
          <div className="description">
            Nothing here...
          </div>
        </div>
      );
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
