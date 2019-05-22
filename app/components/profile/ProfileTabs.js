import React from 'react';

export const TABS = [{
    id: 'posts',
    label: 'Posts'
  }, {
    id: 'following',
    label: 'Following'
  }, {
    id: 'followers',
    label: 'Followers'
  }
];

export default ({ activeTab, changeTab }) => {
  return TABS.map(({ id, label }) => {
    return(
      <a
        key={id}
        className={`item ${activeTab === id ? 'active' : ''}`}
        data-tab={id}
        onClick={() => changeTab(id)}
      >
        {label}
      </a>
    );
  });
}