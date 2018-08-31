import * as React from 'react';
import Posts from '../components/Posts';
import BooksList from '../components/BooksList';
import Following from '../components/Following';
import Followers from '../components/Followers';

export const tabs = [
  {id: 'posts', label: 'Posts', content: <Posts/>},
  {id: 'booksList', label: 'Books List', content: <BooksList/>},
  {id: 'following', label: 'Following', content: <Following/>},
  {id: 'followers', label: 'Followers', content: <Followers/>},
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
    this.setState({
      activeTab: tabId
    })
  };

  render() {
    const user = this.props.appData,
      avatar = user.avatar ? '/' + user.avatar : '/images/avatar-placeholder.jpg',
      tabButtons = [];
    let tabContent = null;

    tabs.forEach((tab) => {
      let active = '';
      if (this.state.activeTab === tab.id) {
        active = 'active';
        tabContent = <div key={tab.id} className={`ui bottom attached tab segment ${active}`}>{tab.content}</div>;
      }
      tabButtons.push(
        <a key={tab.id} className={`item ${active}`} data-tab={tab.id} onClick={() => this.changeTab(tab.id)}>{tab.label}</a>
      );
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