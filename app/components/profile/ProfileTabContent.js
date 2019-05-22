import React from 'react';
import Posts from 'components/profile/Posts';
import FollowingList from 'components/profile/FollowingList';
import FollowersList from 'components/profile/FollowersList';

const POSTS = 'posts';
const FOLLOWING = 'following';
const FOLLOWERS = 'followers';

export default ({ activeTab, refreshFollowersList, userId }) => {
  if (activeTab === POSTS) {
    return <Posts id={userId} />;
  }
  if (activeTab === FOLLOWING) {
    return <FollowingList id={userId} />
  }
  if (activeTab === FOLLOWERS) {
    return <FollowersList refresh={refreshFollowersList} id={userId} />
  }
};