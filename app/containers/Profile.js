import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import _ from 'lodash';
import Posts from '../components/profile/Posts';
import FollowList from '../components/profile/FollowList';
import Followers from '../components/profile/FollowList';
import * as actions from '../actions';

export const TABS_STRUCTURE = [
  { id: 'posts', label: 'Posts', content: (id) => <Posts id={id} /> },
  { id: 'following', label: 'Following', content: (id) => <FollowList id={id} following={true} /> },
  { id: 'followers', label: 'Followers', content: (id) => <FollowList id={id} /> }
];

class Profile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabs: TABS_STRUCTURE,
      activeTab: 'posts',
      id: this.props.match.params.id
    };
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchProfile(id);
  };

  followUser = async () => {
    const res = await axios.post(`/profile/${this.props.profile.user._id}/follow`);
    // TODO: Add notification here.
    console.log(res);
  };

  unfollowUser =  async () => {
    const res = await axios.post(`/profile/${this.props.profile.user._id}/unfollow`);
    // TODO: Add notification here.
    console.log(res);
  };

  changeTab = tabId => {
    this.setState({
      activeTab: tabId
    });
  };

  renderButtons() {
    if (this.props.auth && this.props.auth._id === this.props.profile.user._id) {
      return (
        <div className="ui content">
          <a
            href={`/profile/${this.props.auth._id}/edit`}
            className="ui right floated mini primary button basic"
          >
            Edit
          </a>
          <a href="/logout" className="ui right floated mini button basic">
            Logout
          </a>
        </div>
      )
    }

    if (this.props.auth) {
      if (_.includes(this.props.auth.following, this.props.profile.user._id)) {
        return (
          <div className="ui content">
            <button
              onClick={this.unfollowUser}
              className="ui right floated mini blue button basic"
            >
              Unfollow
            </button>
          </div>
        )
      }

      return (
        <div className="ui content">
            <button
          onClick={this.followUser}
          className="ui right floated mini primary button basic"
            >
            Follow
            </button>
        </div>
      )
    }
  };

  render() {
    console.log('profile', this.props);
    if (!this.props.profile.user) {
      return <h3>Loading...</h3>;
    }

    const { user } = this.props.profile;
    const avatar = user.avatar
      ? '/' + user.avatar
      : '/images/avatar-placeholder.jpg';
    const tabButtons = [];
    let tabContent = null;

    TABS_STRUCTURE.forEach(tab => {
      let active = '';
      if (this.state.activeTab === tab.id) {
        active = 'active';
        tabContent = (
          <div
            key={tab.id}
            className={`ui bottom attached tab segment ${active}`}
          >
            {tab.content(user._id)}
          </div>
        );
      }
      tabButtons.push(
        <a
          key={tab.id}
          className={`item ${active}`}
          data-tab={tab.id}
          onClick={() => this.changeTab(tab.id)}
        >
          {tab.label}
        </a>
      );
    });

    return (
      <div className="segment">
        {this.renderButtons()}
        <div className="ui grid">
          <div className="three wide column">
            <img src={avatar} className="ui small image" />
          </div>
          <div className="twelve wide column">
            <h1 className="ui header">{user.username}</h1>
          </div>
        </div>
        <div className="ui blue divider" />
        <p><i className="book icon"></i>{user.topFiveAuthors}</p>
        <p><i className="heart icon"></i>{user.interests}</p>
        <p><i className="map pin icon"></i>{user.location}</p>
        <div className="ui blue divider" />
        <div className="ui top attached tabular menu">{tabButtons}</div>
        {tabContent}
        <NotificationContainer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, profile: state.profile };
}

// using withRouter allows component to refresh when route param changes
export default withRouter(connect(
  mapStateToProps,
  actions
)(Profile));
