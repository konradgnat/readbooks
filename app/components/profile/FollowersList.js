import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import FollowList from 'components/profile/FollowList';

class FollowersList extends React.Component {
  state = { refresh: false };

  componentDidMount() {
    this.props.fetchUserFollowers(this.props.id);
  }
  componentDidUpdate({ refresh }) {
    if (refresh !== this.props.refresh) {
      this.props.fetchUserFollowers(this.props.id);
    }
  }

  render() {
    return <FollowList list={this.props.followers} />
  }
}

const mapStateToProps = ({ follow: { followers }}) => {
  return { followers };
};

export default connect(mapStateToProps, actions)(FollowersList);