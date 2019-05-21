import React from 'react';
import { shallow } from 'enzyme';
import { FollowersList } from 'components/profile/FollowersList';

describe('FollowersList component', () => {
  it('should render FollowList component', () => {
    const mockFetchUserFollowers = jest.fn();
    const wrapper = shallow(<FollowersList fetchUserFollowers={mockFetchUserFollowers} id='1234'/>);
    expect(wrapper.find('FollowList').length).toEqual(1);
  });

  it('should call fetchUserFollowers with id on mount', () => {
    const mockFetchUserFollowers = jest.fn();
    shallow(<FollowersList fetchUserFollowers={mockFetchUserFollowers} id='1234'/>);
    expect(mockFetchUserFollowers).toHaveBeenCalledWith('1234');
  });

  it('should call fetchUserFollowers on update if refresh value changed', () => {
    const mockFetchUserFollowers = jest.fn();
    const wrapper = shallow(<FollowersList fetchUserFollowers={mockFetchUserFollowers} id='1234'/>);
    wrapper.setProps({ refresh: true });

    expect(mockFetchUserFollowers).toHaveBeenCalledTimes(2);
  });
});