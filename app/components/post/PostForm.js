// @flow
import React from 'react';

type Props = {
  onSubmit: (formValues: State) => void
}

type State = {
  thoughts: string
}

class PostForm extends React.Component<Props, State> {
  constructor(props: Props): void {
    super(props);

    this.state = { thoughts: '' };
  }

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleNameChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({ thoughts: e.target.value });
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <textarea
            row="5"
            type="text"
            name="thoughts"
            value={this.state.thoughts}
            onChange={this.handleNameChange}
            className="input"
            placeholder="250  words or less, what did you think?"
          />
          <input
            className="ui tiny green basic button post__submit"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    )
  }
}

export default PostForm;