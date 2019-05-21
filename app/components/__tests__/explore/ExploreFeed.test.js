import React from 'react';
import ExploreFeed from 'components/explore/ExploreFeed';
import { shallow } from 'enzyme';
import { hits } from 'components/__mocks__/data/exploreSearchHits';

describe('ExploreFeed', () => {
  it('renders correctly without results', () => {
    const wrapper = shallow(<ExploreFeed searchHits={hits} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an element for each item in the search results', () => {
    const wrapper = shallow(<ExploreFeed searchHits={hits}/>);

    expect(wrapper.find('.feedItem').length).toEqual(2);
  });

  // it renders a link to detail page

  describe('rendering search results', () => {
    it('renders the book result image path', () => {
      const IMAGE_PATH = 'image/filepath';
      const results = [{
        id: '1234',
        searchInfo: { textSnippet: 'description' },
        volumeInfo:
          {
            imageLinks: { smallThumbnail: IMAGE_PATH },
            title: 'foo bar title',
            publishedDate: '1999-09-24',
            authors: [ 'John Steinbeck', 'Stanislaw Lem' ]
          }
      }];
      const wrapper = shallow(<ExploreFeed searchHits={results}/>);
      expect(wrapper.find('img').prop('src')).toEqual(IMAGE_PATH);
      wrapper.unmount();
    });

  });
});
