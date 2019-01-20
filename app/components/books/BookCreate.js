import React from 'react';
import { connect } from 'react-redux';
import BookForm from './BookForm';
import { createPost } from '../../actions';

class BookCreate extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.createPost(formValues);
  };

  render() {

    return (
      <div>
        <h1 className="ui header center">Create a Book Post</h1>
        <BookForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { createPost })(BookCreate);