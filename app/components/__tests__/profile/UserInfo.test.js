import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from 'components/profile/UserInfo';

describe('UserInfo component', () => {
  it('renders and displays the passed data', () => {
    const avatar = 'some/avatar/filepath.jpg';
    const user = {
      username: 'username',
      topFiveAuthors: 'some list',
      interests: 'interests',
      location: 'location'
    };
    const wrapper = shallow(
      <UserInfo
        avatar={avatar}
        user={user}
      />
    );
    expect(wrapper.find('img').props().src).toMatch(avatar);
    expect(wrapper.find('h1').text()).toMatch(user.username);
    expect(wrapper.find('.userInfo').text()).toMatch(user.topFiveAuthors);
    expect(wrapper.find('.userInfo').text()).toMatch(user.interests);
    expect(wrapper.find('.userInfo').text()).toMatch(user.location);
  });
});