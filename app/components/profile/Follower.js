// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  avatar: string,
  username: string,
  id: string
}

class Follower extends React.Component<Props> {

  render() {
    let { avatar, username, id } = this.props;
    avatar = avatar ? avatar : 'images/avatar-placeholder.jpg';

    return (
      <div className="item item--follow">
        <img src={'/' + avatar} alt={username} className="ui avatar image"/>
        <div className="content">
          <Link to={`/profile/${id}`} className="description">
            {username}
          </Link>
        </div>
      </div>
    )
  }
}

export default Follower;