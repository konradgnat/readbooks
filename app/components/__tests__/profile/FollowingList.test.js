import React from 'react';
import { shallow } from 'enzyme';
import { FollowingList } from 'components/profile/FollowingList';

describe('FollowingList component', () => {
  it('should render FollowList component', () => {
    const mockFetchUserFollowing = jest.fn();
    const wrapper = shallow(<FollowingList fetchUserFollowing={mockFetchUserFollowing} id='1234'/>);
    expect(wrapper.find('FollowList').length).toEqual(1);
  });

  it('should call fetchUserFollowing with id on mount', () => {
    const mockFetchUserFollowing = jest.fn();
    shallow(<FollowingList fetchUserFollowing={mockFetchUserFollowing} id='1234'/>);
    expect(mockFetchUserFollowing).toHaveBeenCalledWith('1234');
  });
});