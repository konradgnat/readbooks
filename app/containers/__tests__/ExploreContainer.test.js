import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ExploreContainer } from 'containers/ExploreContainer';
import ExploreSearch from 'components/explore/ExploreSearch';
import ExploreFeed from 'components/explore/ExploreFeed';
import Root from 'Root';
import apiCaller from 'util/apiCaller';
import { hits } from 'components/__mocks__/data/exploreSearchHits';

jest.mock('util/apiCaller');


// import bookSearch from 'util/apiCaller';
// const mockSuccessResponse = {};
// const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
// const mockFetchPromise = Promise.resolve({ // 3
//   json: () => mockJsonPromise,
// });
// jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

// const mockHits = hits;
// const mockBookSearch = (arg) => {
//   // return (arg) => {
//     return Promise.resolve({ items: mockHits });
//   // }
// };

// jest.mock('util/apiCaller', (arg1, arg2) => {
//   console.log('this is apicaller', arg1, arg2);
//   return mockBookSearch;
//   // return (arg) => {
//   //   console.log('this is booksearch', arg);
//   //   return Promise.resolve({ items: mockHits });
//   // }
// });
// jest.mock('react-router-dom', () => {
//   return { Link: jest.fn() };
// });

// jest.mock('components/explore/ExploreFeed', () => null);

let wrapper;

beforeEach(() => {
  // wrapper = mount(
  //   <Root>
  //     <ExploreContainer />
  //   </Root>
  // );
  wrapper = shallow(
      <ExploreContainer />
  );
});

afterEach(() => {
  // wrapper.unmount();
});

it('shows a search component', () => {
  expect(wrapper.find(ExploreSearch).length).toEqual(1);
});

it('shows a search results feed component', () => {
  expect(wrapper.find(ExploreFeed).length).toEqual(1);
});

it('initiates a book search when handleSearch is called', (done) => {

  const shallowWrapper = shallow(
      <ExploreContainer p1={'sup'}/>
  );

  // shallowWrapper.update();
  console.log(shallowWrapper.instance().state, 'state1');
  // apiCaller.mockResolvedValue({ items: hits });
  apiCaller.mockImplementation(() => Promise.resolve({ items: hits }));

  shallowWrapper.instance().handleSearch('Searching for a book');

  console.log(shallowWrapper.instance().state, 'state2');
  done();

  // setTimeout(() => {
  //   // expect(global.fetch).toHaveBeenCalledTimes(1);
  //   console.log(shallowWrapper.instance().state, 'state2');
  //   done();
  // }, 1000);

});
