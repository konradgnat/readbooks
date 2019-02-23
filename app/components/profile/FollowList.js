// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Follower from './Follower';

type Props = {
  id: string,
  fetchUserFollowers: function,
  followers: Array<Object>,
  following: Array<Object>
}

class FollowList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUserFollowers(this.props.id, this.props.following);
  }
  renderFollowers = () => {
    if (this.props.followers.length === 0) {
      
      return (
        <div className="item">
          <div className="description">
            Nothing here...
          </div>
        </div>
      )
    }

    return this.props.followers.map(item => {
      return <Follower username={item.username} avatar={item.avatar} id={item._id}/>
    })
  };

  render() {
    return (
      <div className="ui list">
        {this.renderFollowers()}
      </div>
    );
  }
}

const mapStateToProps = ({ followers }) => {
  return { followers };
};

export default connect(mapStateToProps, actions)(FollowList);