import React from 'react';
import { shallow } from 'enzyme';
import { ExploreContainer } from 'containers/ExploreContainer';
import ExploreSearch from 'components/explore/ExploreSearch';
import ExploreFeed from 'components/explore/ExploreFeed';
import apiCaller from 'util/apiCaller';
import { hits } from 'components/__mocks__/data/exploreSearchHits';

jest.mock('util/apiCaller');

let wrapper;

describe('explore container', () => {

  beforeEach(() => {
    wrapper = shallow(
      <ExploreContainer />
    );
  });

  it('renders matching snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows a search component', () => {
    expect(wrapper.find(ExploreSearch).length).toEqual(1);
  });

  it('shows a search results feed component', () => {
    expect(wrapper.find(ExploreFeed).length).toEqual(1);
  });

  describe('the search functionality', () => {
    it('calls the bookSearch function when handleSearch is called', async () => {
      const data = { items: hits };
      const mockAPI = apiCaller.mockImplementation(() =>
        Promise.resolve(data)
      );

      wrapper.find(ExploreSearch).prop('handleSearch')('Searching for a book');
      await mockAPI();
      expect(mockAPI).toHaveBeenCalled();
    });

    it('initiates a book search when handleSearch is called', async () => {
      const data = { items: hits };
      const mockAPI = apiCaller.mockImplementation(() =>
        Promise.resolve(data)
      );

      wrapper.find(ExploreSearch).prop('handleSearch')('Searching for a book');
      await mockAPI();
      expect(wrapper.instance().state.searchHits.length).toEqual(2);
    });
  });
});
