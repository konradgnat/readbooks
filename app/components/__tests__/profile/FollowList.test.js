import React from 'react';
import { shallow } from 'enzyme';
import FollowList from 'components/profile/FollowList';

describe('FollowList component', () => {
  it('should render text notifying nothing is there when no list', () => {
    const wrapper = shallow(<FollowList list={[]} />);

    expect(wrapper.find('.description').text()).toMatch('Nothing here...');
  });

  it('should render one element per each given item', () => {
    const list = [
      { _id: '1234', avatar: 'file/path1', username: 'username1' },
      { _id: '5678', avatar: 'file/path2', username: 'username2' },
    ];
    const wrapper = shallow(<FollowList list={list} />);

    expect(wrapper.find('Follower').length).toEqual(2);
  });

  it('should props to Follower component from given item in the list', () => {
    const list = [
      { _id: '1234', avatar: 'file/path1', username: 'username1' }
    ];
    const wrapper = shallow(<FollowList list={list} />);

    expect(wrapper.find('Follower').props().id).toEqual('1234');
    expect(wrapper.find('Follower').props().username).toEqual('username1');
    expect(wrapper.find('Follower').props().avatar).toEqual('file/path1');
  });
});