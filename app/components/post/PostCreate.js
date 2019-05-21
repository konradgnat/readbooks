// @flow
import React from 'react';
import { connect } from 'react-redux';
import PostForm from 'components/post/PostForm';
import { createPost } from 'actions';

type Props = {
  createPost: ({}) => void,
  bookData: {}
}

export class PostCreate extends React.Component<Props> {
  constructor(props: Props): void {
    super(props);
  }

  onSubmit = (formValues: { thoughts: string }): void => {
    const { createPost, bookData } = this.props;
    const values = { ...bookData, ...formValues };
    createPost(values);
  };

  render() {

    return (
      <div>
        <PostForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { createPost })(PostCreate);