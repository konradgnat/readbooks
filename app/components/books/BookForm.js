import React from 'react';

class BookForm extends React.Component {

  render() {
    return (
      <div>
        BookForm
        <form onSubmit={this.props.onSubmit} action="">
          <input type="text" name="name"/>
          <input type="submit" value="submit" onClick={this.onSubmit}/>
        </form>
      </div>
    )
  }
}

export default BookForm;