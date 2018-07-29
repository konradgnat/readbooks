import React from 'react';
import ExploreFeed from '../../../../../src/pages/Explore/components/ExploreFeed/ExploreFeed';
import { shallow } from 'enzyme';

describe('ExploreFeed', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<ExploreFeed/>);
    expect(wrapper).toMatchSnapshot();
  })
});
