import React from 'react';
import { shallow, mount } from 'enzyme';
import PostForm from 'components/post/PostForm';

let wrapper;

describe('PostForm component', () => {
  beforeEach(() => {
    wrapper = shallow(<PostForm />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render a text area element', () => {
    expect(wrapper.find('textarea').length).toEqual(1);
  });

  it('should render a submit input element', () => {
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
  });

  it('should update the state when comment is entered', () => {
    wrapper.find('textarea').simulate('change', { target: { value: 'new comment' }});
    expect(wrapper.state().thoughts).toEqual('new comment');
  });

  it('should call submit prop function when submit is entered', () => {
    const onSubmitMock = jest.fn();
    wrapper = mount(<PostForm onSubmit={onSubmitMock}/>);
    wrapper.setState({ thoughts: 'existing comment' });
    wrapper.find('input[type="submit"]').simulate('submit');
    expect(onSubmitMock).toHaveBeenCalledWith({ thoughts: 'existing comment' })
  });
});
