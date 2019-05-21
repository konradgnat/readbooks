import React from 'react';
import { shallow } from 'enzyme';
import Post from 'components/profile/Post';

describe('Post component', () => {

  it('renders an image with given file path', () => {
    let wrapper = shallow(
      <Post
        thumbnail='some/filepath.jpg'
        thoughts='some comments'
        title='some title'
        _id='1234'
      />
      );
    expect(wrapper.find('img').props().src).toMatch('some/filepath.jpg');
  });

  it('renders a title with given title text', () => {
    let wrapper = shallow(
      <Post
        thumbnail='some/filepath.jpg'
        thoughts='some comments'
        title='some title'
        _id='1234'
      />
    );
    expect(wrapper.find('.header').text()).toMatch('some title');
  });

  it('renders a comment with given comment text', () => {
    let wrapper = shallow(
      <Post
        thumbnail='some/filepath.jpg'
        thoughts='some comments'
        title='some title'
        _id='1234'
      />
    );
    expect(wrapper.find('.post__desc').text()).toMatch('some comments');
  });

  it('renders a link to the detail page', () => {
    let wrapper = shallow(
      <Post
        thumbnail='some/filepath.jpg'
        thoughts='some comments'
        title='some title'
        _id='1234'
      />
    );
    expect(wrapper.find('a').props().href).toMatch('/posts/1234');
  });
});