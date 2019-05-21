// @flow
import * as React from 'react';
import Follower from './Follower';

type Props = {
  list: Object[]
}

class FollowList extends React.Component<Props> {
  renderFollowList = () => {
    if (!this.props.list || this.props.list.length === 0) {
      return (
        <div className="item">
          <div className="description">
            Nothing here...
          </div>
        </div>
      )
    }

    return this.props.list.map(item => {
      return <Follower key={item._id} username={item.username} avatar={item.avatar} id={item._id}/>
    })
  };

  render() {
    return (
      <div className="ui list">
        {this.renderFollowList()}
      </div>
    );
  }
}

export default FollowList;