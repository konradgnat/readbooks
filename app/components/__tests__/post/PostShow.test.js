import React from 'react';
import { shallow, mount } from 'enzyme';
import { hits } from 'components/__mocks__/data/exploreSearchHits';
import { PostShow } from 'components/post/PostShow';

let wrapper;
describe('PostShow component', () => {
  beforeEach(() => {
    wrapper = shallow(<PostShow location={{ state: hits[0] }}/>);
  });

  it('should toggle showForm value when toggle function is called', () => {
    wrapper.instance().togglePostForm();
    expect(wrapper.state().showForm).toEqual(true);
  });
});
