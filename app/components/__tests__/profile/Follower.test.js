import React from 'react';
import { shallow } from 'enzyme';
import Follower, { DEFAULT_AVATAR_IMAGE } from 'components/profile/Follower';

describe('Follower component', () => {
  it('should render an image with given image file path', () => {
    const wrapper = shallow(<Follower avatar='some/filepath.jpg' />);
    expect(wrapper.find('img').props().src).toMatch('some/filepath.jpg');
  });

  it('should render an image with default image file path', () => {
    const wrapper = shallow(<Follower avatar='' />);
    expect(wrapper.find('img').props().src).toMatch(DEFAULT_AVATAR_IMAGE);
  });

  it('should render a link tag with link to follower id', () => {
    const wrapper = shallow(<Follower username='username' avatar='' id='1234' />);
    expect(wrapper.find('Link').props().to).toEqual('/profile/1234');
  });

  it('should render a link tag with text of follower username', () => {
    const wrapper = shallow(<Follower username='username' avatar='' id='1234' />);
    expect(wrapper.find('Link').props().children).toMatch('username');
  });
});