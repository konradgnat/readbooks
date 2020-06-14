import React from 'react';
import { shallow } from 'enzyme';
import { ProfileContainer } from 'containers/ProfileContainer';

describe('ProfileContainer component', () => {
  describe('renders components', () => {
    beforeEach(() => {
      const authMock = [];
      const matchMock = { params: { id: '1234' } };
      const profileMock = { user: 'user' };
      const fetchProfileMock = jest.fn();
      const wrapper = shallow(
        <ProfileContainer
          auth={authMock}
          match={matchMock}
          profile={profileMock}
          fetchProfile={fetchProfileMock}
        />
      );
    });
    it('renders a UserInfo component', () => {
      expect(wrapper.find('UserInfo')).toBeDefined();
    });

    it('renders a ProfileTabs component', () => {
      expect(wrapper.find('ProfileTabs')).toBeDefined();
    });

    it('renders a NotificationContainer component', () => {
      expect(wrapper.find('NotificationContainer')).toBeDefined();
    });
  });
  it('passes given avatar to UserInfo component', () => {
    const authMock = [];
    const matchMock = { params: { id: '1234' } };
    const profileMock = { user: 'user', avatar: 'avatar/filepath.jpg' };
    const fetchProfileMock = jest.fn();
    const wrapper = shallow(
      <ProfileContainer
        auth={authMock}
        match={matchMock}
        profile={profileMock}
        fetchProfile={fetchProfileMock}
      />
    );
    console.log(wrapper.find('UserInfo').avatar);
    expect(wrapper.find('UserInfo').instance().props().avatar).toMatch('avatar/filepath.jpg');
  });
});