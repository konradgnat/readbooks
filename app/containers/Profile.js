import * as React from 'react';
import PostsTab from '../components/PostsTab';

export const tabs = [
  {id: 'posts', label: 'Posts', active: true, content: <PostsTab/>},
  {id: 'readingList', label: 'Reading List', active: false, content: <PostsTab/>},
  {id: 'following', label: 'Following', active: false, content: <PostsTab/>},
  {id: 'followers', label: 'Followers', active: false, content: <PostsTab/>},
];

export default class Profile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabs: tabs,
      activeTab: 'posts'
    }
  }

  changeTab = (tabId) => {
    let updatedTab = this.state.tabs.map(t => {
      Object.assign({}, t, {active: t.id === tabId})
    });
    this.setState({
      tabs: updatedTab
    })
  };

  render() {
    const user = this.props.appData,
      avatar = user.avatar ? '/' + user.avatar : '/images/avatar-placeholder.jpg',
      tabButtons = [],
      tabContent = [];
    tabs.forEach((tab) => {
      let active = tab.active ? 'active' : '';
      tabButtons.push(
        <a key={tab.id} className={`item ${active}`} data-tab={tab.id} onClick={() => this.changeTab(tab.id)}>{tab.label}</a>
      );
      tabContent.push(
        <div key={tab.id} className={`ui bottom attached tab segment ${active}`}>{tab.content}</div>
      )
    });
    return (
      <div className="segment">
        <a href="/" className="ui right floated mini primary button basic">Edit</a>
        <a href="/logout" className="ui right floated mini button basic">Logout</a>

        <div class="ui grid">
          <div class="three wide column">
            <img src={avatar} className="ui small image"/>
          </div>
          <div class="twelve wide column">
            <h1 className="ui header">
              {user.username}
            </h1>
          </div>
        </div>

        <div className="ui blue divider"></div>

        <p>
          <strong>Bio:</strong> {user.bio}<br/>
          <strong>Five Favorite Authors:</strong> {user.topFiveAuthors}<br/>
        </p>

        <div className="ui blue divider"></div>

        <div className="ui top attached tabular menu">
          {tabButtons}
        </div>
        {tabContent}
      </div>
    )
  }
}