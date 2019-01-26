// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Followers extends React.Component<> {
  componentDidMount() {
    this.props.fetchUserFollowers(this.props.id);
  }
  renderFollowers = () => {
    return this.props.followers.map(item => {
      const avatar = item.avatar ? item.avatar : '/images/avatar-placeholder.jpg';
      return (
        <div className="item">
          <img src={avatar} alt={item.username} className="ui avatar image"/>
          <div className="content">
            <div className="description">
              {item.username}
            </div>
          </div>
        </div>
      )
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

export default connect(mapStateToProps, actions)(Followers);