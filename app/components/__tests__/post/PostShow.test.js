import React from 'react';
import { shallow, mount } from 'enzyme';
import { hits } from 'components/__mocks__/data/exploreSearchHits';
import { PostShow } from 'components/post/PostShow';
import { PostCreate } from 'components/post/PostCreate';

let wrapper;
describe('PostShow component', () => {
  beforeEach(() => {
    wrapper = shallow(<PostShow location={{ state: hits[0] }}/>);
  });

  it('should toggle showForm value when toggle function is called', () => {
    wrapper.instance().togglePostForm();
    expect(wrapper.state().showForm).toEqual(true);
  });
  it('should render the form when showForm is true', () => {
    // wrapper.instance().togglePostForm();
    wrapper = new PostShow();
    PostShow.state = { showForm: true };
    // wrapper.setState({ showForm: true });
    // wrapper.update();
    console.log('wrapper.renderForm()', wrapper.renderForm());
    expect(wrapper.renderForm()).toEqual('s');
    // expect(wrapper.find(PostCreate)).to.have.lengthOf(1)
  })
});
