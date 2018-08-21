import * as React from 'react';

export default class Profile extends React.Component<Props> {

  render() {
    const user = this.props.appData;
    const avatar = (
      user.avatar ? (<img src={'/' + user.avatar} className="ui small image"/>) : ''
    );
    return (
      <div className="segment">
        <a href="/" className="ui right floated mini primary button basic">Edit</a>
        <a href="/logout" className="ui right floated mini button basic">Logout</a>

        <div class="ui grid">
          <div class="three wide column">
            {avatar}
          </div>
          <div class="twelve wide column">
            <h1 className="ui header">
              {user.username}
            </h1>
          </div>s
        </div>

        <div className="ui blue divider"></div>

        <p>
          <strong>Bio:</strong> {user.bio}<br/>
          <strong>Five Favorite Authors:</strong> {user.topFiveAuthors}<br/>
        </p>

        <div className="ui blue divider"></div>

        <div className="ui top attached tabular menu">
          <a className="item" data-tab="first">Posts</a>
          <a className="item" data-tab="second">Reading List</a>
          <a className="item" data-tab="third">Following</a>
          <a className="item active" data-tab="third">Followers</a>
        </div>
        <div className="ui bottom attached tab segment" data-tab="first">
          First
        </div>
        <div className="ui bottom attached tab segment" data-tab="second">
          Second
        </div>
        <div className="ui bottom attached tab segment active" data-tab="third">
          Third
        </div>
      </div>
    )
  }
}