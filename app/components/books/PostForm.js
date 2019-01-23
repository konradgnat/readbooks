import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div>
        PostForm
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default PostForm;