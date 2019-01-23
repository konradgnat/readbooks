import React from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { createPost } from '../../actions';

class PostCreate extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

    console.log('componentDidMount', this.state);
  }

  onSubmit = (formValues) => {
    const values = { ...this.props.location.state, ...formValues };
    this.props.createPost(values);
  };

  render() {

    return (
      <div>
        <h1 className="ui header center">Create a Book Post</h1>
        <PostForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { createPost })(PostCreate);