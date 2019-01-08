import React from 'react';
import ExploreDetail from '../../containers/ExploreDetail';
import { shallow } from 'enzyme';
import { hits } from '../../__mocks__/data/exploreSearchHits';

describe('ExploreDetail', () => {
  it('should render and match snapshot', () => {
    const wrapper = shallow(<ExploreDetail location={{ state: hits[0] }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
