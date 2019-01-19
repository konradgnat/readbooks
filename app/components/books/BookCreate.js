import React from 'react';
import { connect } from 'react-redux';
import BookForm from './BookForm';
import { createPost } from '../../actions';

class BookCreate extends React.Component {
  onSubmit = (formData) => {
    console.log(formData);
  };

  render() {
    console.log(this.props, createPost);
    this.props.createPost();

    return (
      <div>
        <h1 className="ui header center">Create a Book Post</h1>
        <BookForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { createPost })(BookCreate);