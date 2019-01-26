import * as React from 'react';
import Posts from '../components/profile/Posts';
import Following from '../components/profile/Following';
import Followers from '../components/profile/Followers';
import { connect } from 'react-redux';
import * as actions from '../actions';

export const TABS_STRUCTURE = [
  { id: 'posts', label: 'Posts', content: <Posts /> },
  { id: 'following', label: 'Following', content: <Following /> },
  { id: 'followers', label: 'Followers', content: <Followers /> }
];

class Profile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabs: TABS_STRUCTURE,
      activeTab: 'posts'
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchProfile(id);
  }

  changeTab = tabId => {
    this.setState({
      activeTab: tabId
    });
  };

  render() {
    // check if current user is same
    console.log('this props', this.props);

    if (!this.props.profile) {
      return <h3>Loading...</h3>;
    }

    const { profile } = this.props;
    const avatar = profile.avatar
      ? '/' + profile.avatar
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
            {tab.content}
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
            <h1 className="ui header">{profile.username}</h1>
          </div>
        </div>

        <div className="ui blue divider" />
        <p>
          <strong>Bio:</strong> {profile.bio}
          <br />
          <strong>Five Favorite Authors:</strong> {profile.topFiveAuthors}
          <br />
        </p>

        <div className="ui blue divider" />
        <div className="ui top attached tabular menu">{tabButtons}</div>
        {tabContent}
      </div>
    );
  }

  renderButtons() {
    if (this.props.auth) {
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

    return (
      <div className="ui content">
        <a
          className="ui right floated mini primary button basic"
        >
          Follow
        </a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, profile: state.profile };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
