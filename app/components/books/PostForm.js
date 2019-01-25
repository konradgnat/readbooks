import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { thoughts: '' };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleNameChange = e => {
    this.setState({ thoughts: e.target.value });
  };

  render() {
    return (
      <div>
        PostForm
        <form onSubmit={this.handleSubmit}>
          <textarea row="5" type="text" name="thoughts" value={this.state.name} onChange={this.handleNameChange} className="input" placeholder="250 words min" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default PostForm;