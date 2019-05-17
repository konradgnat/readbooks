// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import axios from 'axios';
import _ from 'lodash';
import Posts from '../components/profile/Posts';
import FollowList from '../components/profile/FollowList';
import Followers from '../components/profile/FollowList';
import UserInfo from '../components/profile/UserInfo';
import * as actions from '../actions';

// Todo: Add maps, to allow debugging on compiled, browser code, (webpack)

export const TABS = {
  'posts': {
    id: 'posts',
    label: 'Posts',
    content: id => <Posts id={id} />
  },
  'following': {
    id: 'following',
    label: 'Following',
    content: id => <FollowList id={id} following={true} />
  },
  'followers': {
    id: 'followers',
    label: 'Followers',
    content: id => <FollowList id={id} />
  }
};

class Profile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 'posts',
      id: this.props.match.params.id,
      following: this.props.auth ? this.props.auth.following : []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchProfile(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth) {
      this.setState({ following: this.props.auth.following });
    }
  }

  // Todo: extract to redux-thunk action
  followUser = async () => {
    const res = await axios.post(
      `/profile/${this.props.profile.user._id}/follow`
    );
    if (!res.data.error) {
      NotificationManager.success(
        `Success! Followed ${this.props.profile.user.username}`
      );
      this.setState({ following: res.data.following });
    }
  };

  // Todo: extract to redux-thunk action
  unfollowUser = async () => {
    const res = await axios.post(
      `/profile/${this.props.profile.user._id}/unfollow`
    );
    if (!res.data.error) {
      NotificationManager.success(
        `Success! Unfollowed ${this.props.profile.user.username}`
      );
      this.setState({ following: res.data.following });
    }
  };

  changeTab = tabId => {
    this.setState({
      activeTab: tabId
    });
  };

  renderButtons() {
    const { auth, profile } = this.props;
    const { following } = this.state;
    if (auth &&
      auth._id === profile.user._id
    ) {
      return (
        <div className="ui content">
          <a
            href={`/profile/${auth._id}/edit`}
            className="ui right floated mini primary button basic"
          >
            Edit
          </a>
          <a href="/logout" className="ui right floated mini button basic">
            Logout
          </a>
        </div>
      );
    }

    if (auth) {
      if (_.includes(following, profile.user._id)) {
        return (
          <div className="ui content">
            <button
              onClick={this.unfollowUser}
              className="ui right floated mini blue button basic"
            >
              Unfollow
            </button>
          </div>
        );
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
      );
    }
  }

  renderTabs = () => {
    const { activeTab } = this.state;

    return Object.keys(TABS).map(tabId => {
      const tab = TABS[tabId];
      return(
        <a
          key={tabId}
          className={`item ${activeTab === tabId ? 'active' : ''}`}
          data-tab={tabId}
          onClick={() => this.changeTab(tabId)}
        >
          {tab.label}
        </a>
      );
    });
  };

  render() {
    const { user } = this.props.profile;
    if (!user) {
      return <h3>Loading...</h3>;
    }

    const { activeTab } = this.state;
    const avatar = user.avatar
      ? '/' + user.avatar
      : '/images/avatar-placeholder.jpg';

    return (
      <div className="segment">
        {this.renderButtons()}
        <UserInfo user={user} avatar={avatar}/>
        <div className="ui top attached tabular menu">
          {this.renderTabs()}
        </div>
        <div
          key={TABS[activeTab].id}
          className={`ui bottom attached tab segment active`}
        >
          {TABS[activeTab].content(user.id)}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, profile: state.profile };
}

// using withRouter allows component to refresh when route param changes
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Profile)
);
