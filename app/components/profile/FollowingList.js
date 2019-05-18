import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FollowList from './FollowList';

class FollowingList extends React.Component {
  componentDidMount() {
    this.props.fetchUserFollowing(this.props.id);
  }
  render() {
    return <FollowList list={this.props.following} />
  }
}

const mapStateToProps = ({ follow: { following }}) => {
  return { following };
};

export default connect(mapStateToProps, actions)(FollowingList);