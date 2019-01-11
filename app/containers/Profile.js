import * as React from 'react';
import Posts from '../components/Posts';
import ReadingList from '../components/ReadingList';
import Following from '../components/Following';
import Followers from '../components/Followers';
import { connect } from 'react-redux';
import * as actions from '../actions';

export const TABS_STRUCTURE = [
  { id: 'posts', label: 'Posts', content: <Posts /> },
  { id: 'readingList', label: 'Reading List', content: <ReadingList /> },
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

  changeTab = tabId => {
    this.setState({
      activeTab: tabId
    });
  };

  render() {
    if (!this.props.auth) return <h3>Loading...</h3>;
    const user = this.props.auth;
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
        <a
          href={`/profile/${this.props.auth._id}/edit`}
          className="ui right floated mini primary button basic"
        >
          Edit
        </a>
        <a href="/logout" className="ui right floated mini button basic">
          Logout
        </a>

        <div className="ui grid">
          <div className="three wide column">
            <img src={avatar} className="ui small image" />
          </div>
          <div className="twelve wide column">
            <h1 className="ui header">{user.username}</h1>
          </div>
        </div>

        <div className="ui blue divider" />
        <p>
          <strong>Bio:</strong> {user.bio}
          <br />
          <strong>Five Favorite Authors:</strong> {user.topFiveAuthors}
          <br />
        </p>

        <div className="ui blue divider" />
        <div className="ui top attached tabular menu">{tabButtons}</div>
        {tabContent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('map here', state);
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
