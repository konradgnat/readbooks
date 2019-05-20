import React from 'react';
import ExploreFeed from 'components/explore/ExploreFeed';
import { shallow } from 'enzyme';
import { hits } from 'components/__mocks__/data/exploreSearchHits';

describe('ExploreFeed', () => {
  it('renders correctly without results', () => {
    const wrapper = shallow(<ExploreFeed searchHits={hits} />);
    expect(wrapper).toMatchSnapshot();
  });
});
