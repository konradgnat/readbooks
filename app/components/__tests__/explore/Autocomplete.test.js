import React from 'react';
import Autocomplete from 'components/explore/Autocomplete';
import { shallow, mount } from 'enzyme';
import apiCaller from 'util/apiCaller';

jest.mock('util/apiCaller', () => jest.fn());

const mountComponent = (currentIndex, query, onClick, onSuggestions, open) => {
  return mount(
    <Autocomplete
      currentIndex={currentIndex}
      query={query}
      onClick={onClick}
      onSuggestions={onSuggestions}
      open={open}
    />
  );
};

describe('Autocomplete', () => {
  it('renders matching snapshot', () => {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper).toMatchSnapshot();
  });

  let hits;
  let mockAPI;
  beforeEach(() => {
    hits = [
      {
        id: 'resultID1',
        volumeInfo: {
          title: 'Title 1'
        }
      },
      {
        id: 'resultID2',
        volumeInfo: {
          title: 'Title 2'
        }
      }
    ];

    mockAPI = apiCaller.mockImplementation(() =>
      Promise.resolve({ items: hits })
    );
  });
  afterEach(() => {
    jest.resetAllMocks()
  });

  it('should perform search and display a list when a new query is entered', async () => {
    const onSuggestions = jest.fn();
    const wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      onSuggestions,
      false
    );
    wrapper.setProps({ query: 'new query' });
    expect(apiCaller).toHaveBeenCalledWith('new query');
    await mockAPI();
    expect(wrapper.state('hits')).toEqual(hits);
    expect(onSuggestions).toHaveBeenCalledWith(hits);
    wrapper.unmount();
  });

  it('should not search when the query trims to empty string', async () => {

    const onSuggestions = jest.fn();
    const wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      onSuggestions,
      false
    );

    wrapper.setProps({ query: '    ' });
    await mockAPI();
    expect(wrapper.state('hits')).toEqual([]);
    expect(onSuggestions).toHaveBeenCalledWith([]);
    expect(mockAPI.mock.calls).toEqual([[]]);
    wrapper.unmount();
  });

  it('should not search when new query is empty after previous search', async () => {

    const onSuggestions = jest.fn();
    const wrapper = mountComponent(
      -1,
      'existing query',
      jest.fn(),
      onSuggestions,
      false
    );

    wrapper.setProps({ query: '' });
    await mockAPI();
    expect(wrapper.state('hits')).toEqual([]);
    expect(onSuggestions).toHaveBeenCalledWith([]);
    expect(mockAPI.mock.calls).toEqual([[]]);
    wrapper.unmount();
  });

  it('should call renderHit for each hit when query is entered', async () => {
    const onSuggestions = jest.fn();
    const mockRenderHit = jest.fn();
    const wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      onSuggestions,
      false
    );
    wrapper.instance().renderHit = mockRenderHit;
    wrapper.setProps({ query: 'new query' });
    await mockAPI();

    expect(mockRenderHit).toHaveBeenCalledTimes(2);
    wrapper.unmount();
  });

  it('should render an item for each hit when query is entered', async () => {
    const onSuggestions = jest.fn();
    const wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      onSuggestions,
      false
    );
    wrapper.setProps({ query: 'new query' });
    await mockAPI();

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.state('hits')).toEqual(hits);
    wrapper.unmount();
  });
});
