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
import FollowingList from '../components/profile/FollowingList';
import FollowersList from '../components/profile/FollowersList';
import UserInfo from '../components/profile/UserInfo';
import * as actions from '../actions';

// Todo: Add maps, to allow debugging on compiled, browser code, (webpack)
const POSTS = 'posts';
const FOLLOWING = 'following';
const FOLLOWERS = 'followers';

export const TABS = {
  'posts': {
    id: 'posts',
    label: 'Posts'
  },
  'following': {
    id: 'following',
    label: 'Following'
  },
  'followers': {
    id: 'followers',
    label: 'Followers'
  }
};

class Profile extends React.Component {
  constructor(props: Props) {
    super(props);
    const { auth, match: { params: { id } } } = this.props;
    this.state = {
      activeTab: 'posts',
      id,
      following: auth ? auth.following : [],
      refreshFollowersList: false
    };
  }

  componentDidMount() {
    const { fetchProfile, match: { params: { id }}} = this.props;
    fetchProfile(id);
  }

  componentDidUpdate(prevProps) {
    const { auth } = this.props;
    if (auth !== prevProps.auth) {
      this.setState({ following: auth.following });
    }
  }

  followUser = async () => {
    const res = await axios.post(
      `/profile/${this.props.profile.user._id}/follow`
    );
    if (!res.data.error) {
      NotificationManager.success(
        `Success! Followed ${this.props.profile.user.username}`
      );
      this.setState({
        following: res.data.following,
        refreshFollowersList: !this.state.refreshFollowersList
      });
    }
  };

  unfollowUser = async () => {
    const res = await axios.post(
      `/profile/${this.props.profile.user._id}/unfollow`
    );
    if (!res.data.error) {
      NotificationManager.success(
        `Success! Unfollowed ${this.props.profile.user.username}`
      );
      this.setState({
        following: res.data.following,
        refreshFollowersList: !this.state.refreshFollowersList
      });
      this.forceUpdate();
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
    if (!auth) {
      return
    }
    if (auth._id === profile.user._id) {
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

  renderTabContent = () => {
    const { user: { _id } } = this.props.profile;
    const { activeTab, refreshFollowersList } = this.state;
    if (activeTab === POSTS) {
      return <Posts id={_id} />;
    }
    if (activeTab === FOLLOWING) {
      return <FollowingList id={_id} />
    }
    if (activeTab === FOLLOWERS) {
      return <FollowersList refresh={refreshFollowersList} id={_id} />
    }
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
          key={activeTab}
          className={`ui bottom attached tab segment active`}
        >
          {this.renderTabContent()}
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
