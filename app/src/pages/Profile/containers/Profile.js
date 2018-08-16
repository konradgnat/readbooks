import * as React from 'react';

export default class Profile extends React.Component<Props> {

  render() {
    const user = this.props.appData;
    const avatar = (
      user.avatar ? (<img src={'/' + user.avatar} className="ui small image"/>) : ''
    );
    return (
      <div className="segment">
        <h1 className="ui header">
          {user.username}
        </h1>
        <a href="/" className="ui mini primary button basic">Edit</a>
        <a href="/logout" className="ui mini button basic">Logout</a>
        <div className="ui blue divider"></div>

        {avatar}
        <p>
          <strong>Bio:</strong> {user.bio}<br/>
          <strong>Five Favorite Authors:</strong> {user.topFiveAuthors}<br/>
        </p>
      </div>
    )
  }
}