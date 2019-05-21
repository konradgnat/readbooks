import React from 'react';
import ExploreFeed, { DEFAULT_IMAGE_PATH } from 'components/explore/ExploreFeed';
import { shallow } from 'enzyme';
import { hits } from 'components/__mocks__/data/exploreSearchHits';

describe('ExploreFeed', () => {
  it('renders correctly without results', () => {
    const wrapper = shallow(<ExploreFeed searchHits={hits} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an element for each item in the search results', () => {
    const wrapper = shallow(<ExploreFeed searchHits={hits}/>);

    expect(wrapper.find('.feed__item').length).toEqual(2);
  });

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

    it('renders the default image when no image path is given', () => {
      const results = [{
        id: '1234',
        searchInfo: { textSnippet: 'description' },
        volumeInfo:
          {
            title: 'foo bar title',
            publishedDate: '1999-09-24',
            authors: [ 'John Steinbeck', 'Stanislaw Lem' ]
          }
      }];
      const wrapper = shallow(<ExploreFeed searchHits={results}/>);
      expect(wrapper.find('img').prop('src')).toEqual(DEFAULT_IMAGE_PATH);
      wrapper.unmount();
    });

    it('renders a comma separated list of all authors', () => {
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
      expect(wrapper.find('.authors').text()).toEqual('John Steinbeck, Stanislaw Lem');
      wrapper.unmount();
    });

    it('renders the search result item with a title', () => {
      const TITLE = 'foo bar title';
      const results = [{
        id: '1234',
        searchInfo: { textSnippet: 'description' },
        volumeInfo:
          {
            imageLinks: { smallThumbnail: 'image/filepath' },
            title: TITLE,
            publishedDate: '1999-09-24',
            authors: [ 'John Steinbeck', 'Stanislaw Lem' ]
          }
      }];
      const wrapper = shallow(<ExploreFeed searchHits={results}/>);
      expect(wrapper.find('.feed__item_title').text()).toEqual(TITLE);
      wrapper.unmount();
    });

    it('renders the search result date formatted from yyyy-mm-dd to mm/dd/yyyy ', () => {
      const results = [{
        id: '1234',
        searchInfo: { textSnippet: 'description' },
        volumeInfo:
          {
            imageLinks: { smallThumbnail: 'image/filepath' },
            title: 'foo bar title',
            publishedDate: '1999-09-24',
            authors: [ 'John Steinbeck', 'Stanislaw Lem' ]
          }
      }];
      const wrapper = shallow(<ExploreFeed searchHits={results}/>);
      expect(wrapper.find('.feed__item_date').text()).toEqual('09/24/1999');
      wrapper.unmount();
    });

    it('renders the search result date year if only year is given', () => {
      const results = [{
        id: '1234',
        searchInfo: { textSnippet: 'description' },
        volumeInfo:
          {
            imageLinks: { smallThumbnail: 'image/filepath' },
            title: 'foo bar title',
            publishedDate: '1999',
            authors: [ 'John Steinbeck', 'Stanislaw Lem' ]
          }
      }];
      const wrapper = shallow(<ExploreFeed searchHits={results}/>);
      expect(wrapper.find('.feed__item_date').text()).toEqual('1999');
      wrapper.unmount();
    });

    it('renders the search result description', () => {
      const results = [{
        id: '1234',
        searchInfo: { textSnippet: 'description' },
        volumeInfo:
          {
            imageLinks: { smallThumbnail: 'image/filepath' },
            title: 'foo bar title',
            publishedDate: '1999',
            authors: [ 'John Steinbeck', 'Stanislaw Lem' ]
          }
      }];
      const wrapper = shallow(<ExploreFeed searchHits={results}/>);
      expect(wrapper.find('.feed__item_description').html()).toMatch(/description/);
      wrapper.unmount();
    });

    it('renders a link in the result item to the detail page', () => {
      const results = [{
        id: '1234',
        searchInfo: { textSnippet: 'description' },
        volumeInfo:
          {
            imageLinks: { smallThumbnail: 'image/filepath' },
            title: 'foo bar title',
            publishedDate: '1999',
            authors: [ 'John Steinbeck', 'Stanislaw Lem' ]
          }
      }];
      const wrapper = shallow(<ExploreFeed searchHits={results}/>);
      expect(wrapper.find('.feed__item_link').props().to.pathname).toEqual('/explore/1234');
      wrapper.unmount();
    });
  });
});
