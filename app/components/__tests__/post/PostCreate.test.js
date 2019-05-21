import React from 'react';
import { shallow } from 'enzyme';
import { PostCreate } from 'components/post/PostCreate';

describe('PostCreate component', () => {
  it('should render a PostForm component', () => {
    const wrapper = shallow(<PostCreate />);
    expect(wrapper.find('PostForm').length).toEqual(1);
  });

  it('should call createPost function when the form is submitted', () => {
    const createPostMock = jest.fn();
    const wrapper = shallow(<PostCreate createPost={createPostMock} />);
    wrapper.find('PostForm').props().onSubmit();
    expect(createPostMock).toHaveBeenCalled();
  });

  it('should call createPost function with form data when the form is submitted', () => {
    const createPostMock = jest.fn();
    const mockFormData = { thoughts: 'some comment' };
    const wrapper = shallow(<PostCreate createPost={createPostMock} />);
    wrapper.find('PostForm').props().onSubmit(mockFormData);
    expect(createPostMock).toHaveBeenCalledWith(mockFormData);
  });

  it('should call createPost function with book data when the form is submitted', () => {
    const createPostMock = jest.fn();
    const mockBookData = { data: 'some data' };
    const wrapper = shallow(<PostCreate bookData={mockBookData} createPost={createPostMock} />);
    wrapper.find('PostForm').props().onSubmit();
    expect(createPostMock).toHaveBeenCalledWith(mockBookData);
  });
});