import React from 'react';
import Autocomplete from 'components/explore/Autocomplete';
import { shallow, mount } from 'enzyme';
import apiCaller from 'util/apiCaller';

jest.mock('util/apiCaller', () => jest.fn());

describe('Autocomplete', () => {
  it('renders matching snapshot', () => {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper).toMatchSnapshot();
  });

  let hits;
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
  });

  it('should search and display list when new query is entered', async () => {
    const mockAPI = apiCaller.mockImplementation(() =>
      Promise.resolve({ items: hits })
    );
    const onSuggestions = jest.fn();
    const wrapper = mount(
      <Autocomplete
        currentIndex={-1}
        query={''}
        onClick={jest.fn()}
        onSuggestions={onSuggestions}
        open={false}
      />
    );
    wrapper.setProps({ query: 'new query' });
    expect(apiCaller).toHaveBeenCalledWith('new query');
    await mockAPI();
    expect(wrapper.state('hits')).toEqual(hits);
    expect(onSuggestions).toHaveBeenCalledWith(hits);
  });

  it('should not search when the query trims to empty string', async () => {
    const onSuggestions = jest.fn();
    const wrapper = mount(
      <Autocomplete
        currentIndex={-1}
        query={''}
        onClick={jest.fn()}
        onSuggestions={onSuggestions}
        open={false}
      />
    );
    wrapper.setProps({ query: '    ' });
    expect(wrapper.state('hits')).toEqual([]);
    expect(onSuggestions).toHaveBeenCalledWith([]);
  });

  it('should call renderHit for each hit when query is entered', async () => {
    const mockAPI = apiCaller.mockImplementation(() =>
      Promise.resolve({ items: hits })
    );
    const onSuggestions = jest.fn();
    const mockRenderHit = jest.fn();
    const wrapper = mount(
      <Autocomplete
        currentIndex={-1}
        query={''}
        onClick={jest.fn()}
        onSuggestions={onSuggestions}
        open={false}
      />
    );
    wrapper.instance().renderHit = mockRenderHit;
    wrapper.setProps({ query: 'new query' });
    await mockAPI();

    expect(mockRenderHit).toHaveBeenCalledTimes(2);
  });

  it('should render an item for each hit when query is entered', async () => {
    const mockAPI = apiCaller.mockImplementation(() =>
      Promise.resolve({ items: hits })
    );
    const onSuggestions = jest.fn();
    const wrapper = mount(
      <Autocomplete
        currentIndex={-1}
        query={''}
        onClick={jest.fn()}
        onSuggestions={onSuggestions}
        open={false}
      />
    );
    wrapper.setProps({ query: 'new query' });
    await mockAPI();

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.state('hits')).toEqual(hits);
  });
});
