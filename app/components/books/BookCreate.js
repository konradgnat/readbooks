import React from 'react';
import BookForm from './BookForm';

class BookCreate extends React.Component {
  onSubmit = (formData) => {
    console.log(formData);
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

export default BookCreate;