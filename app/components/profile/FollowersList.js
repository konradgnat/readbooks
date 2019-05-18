import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FollowList from './FollowList';

class FollowersList extends React.Component {
  componentDidMount() {
    this.props.fetchUserFollowers(this.props.id);
  }
  render() {
    return <FollowList list={this.props.followers} />
  }
}

const mapStateToProps = ({ followers }) => {
  return { followers: followers };
};

export default connect(mapStateToProps, actions)(FollowersList);