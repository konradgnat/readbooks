import React from 'react';
import { shallow } from 'enzyme';
import { Posts } from 'components/profile/Posts';
import Post from 'components/profile/Post';

describe('Posts component', () => {
  it('should render an empty div if there are no posts', () => {
    const mockFetchPosts = jest.fn();
    const wrapper = shallow(<Posts fetchPosts={mockFetchPosts}/>);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('calls fetchPosts with id on mount', () => {
    const mockFetchPosts = jest.fn();
    shallow(<Posts fetchPosts={mockFetchPosts} id='1234' />);
    expect(mockFetchPosts).toHaveBeenCalledWith('1234');
  });

  it('calls fetchPosts on update when id is different', () => {
    const mockFetchPosts = jest.fn();
    const wrapper = shallow(<Posts fetchPosts={mockFetchPosts} id='1234' />);
    wrapper.setProps({ id: '5678' });
    expect(mockFetchPosts).toHaveBeenCalledTimes(2);
  });

  it('renders text notifying nothing is there when posts array is empty', () => {
    const mockFetchPosts = jest.fn();
    const wrapper = shallow(
      <Posts fetchPosts={mockFetchPosts} id='1234' posts={[]}/>
      );
    expect(wrapper.find('.description').text()).toMatch('Nothing here');
  });

  it('renders Post components when posts are not empty', () => {
    const mockFetchPosts = jest.fn();
    const mockPosts = [
      {
        thumbnail: 'some/filepath.jpg',
        thoughts: 'some comments',
        title: 'some title',
        _id: '1234'
      },
      {
        thumbnail: 'some/filepath2.jpg',
        thoughts: 'some comments2',
        title: 'some title2',
        _id: '5678'
      }
    ];

    const wrapper = shallow(
      <Posts fetchPosts={mockFetchPosts} id='1234' posts={mockPosts}/>
      );
    expect(wrapper.find(Post).length).toEqual(2);
  });

  it('passes the post object to the Post component', () => {
    const mockFetchPosts = jest.fn();
    const mockPosts = [
      {
        thumbnail: 'some/filepath.jpg',
        thoughts: 'some comments',
        title: 'some title',
        _id: '1234'
      }
    ];

    const wrapper = shallow(
      <Posts fetchPosts={mockFetchPosts} id='1234' posts={mockPosts}/>
      );
    expect(wrapper.find(Post).props().post).toEqual(mockPosts[0]);
  });
});