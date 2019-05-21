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


let hits;
let mockAPI;
let wrapper;

describe('Autocomplete', () => {
  it('renders matching snapshot', () => {
    wrapper = shallow(<Autocomplete />);
    expect(wrapper).toMatchSnapshot();
  });

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
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('should perform search and display a list when a new query is entered', async () => {
    const onSuggestions = jest.fn();
    wrapper = mountComponent(
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
  });

  it('should not search when the query trims to empty string', async () => {
    const onSuggestions = jest.fn();
    wrapper = mountComponent(
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
  });

  it('should not search when new query is empty after previous search', async () => {
    const onSuggestions = jest.fn();
    wrapper = mountComponent(
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
  });

  it('should call renderHit for each hit when query is entered', async () => {
    const onSuggestions = jest.fn();
    const mockRenderHit = jest.fn();
    wrapper = mountComponent(
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
  });

  it('should render an item for each hit when query is entered', async () => {
    const onSuggestions = jest.fn();
    wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      onSuggestions,
      false
    );
    wrapper.setProps({ query: 'new query' });
    await mockAPI();
    wrapper.update();
    expect(wrapper.find('.suggestion').length).toEqual(2);
    expect(wrapper.state('hits')).toEqual(hits);
  });

  it('should render the selected item in the dropdown with class selected', async () => {
    const onSuggestions = jest.fn();
    wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      onSuggestions,
      false
    );
    wrapper.setProps({ query: 'new query' });
    await mockAPI();

    // load dropdown with none of the items selected
    wrapper.update();
    expect(
      wrapper.find('.suggestion').at(1).prop('className')
    ).toEqual('suggestion');
    // change selected dropdown item to second item
    wrapper.setProps({ 'currentIndex': 1 });
    expect(
      wrapper.find('.suggestion').at(1).prop('className')
    ).toEqual('suggestion selected');
  });

  it('should render the title in each dropdown list item', async () => {
    const onSuggestions = jest.fn();
    wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      onSuggestions,
      false
    );
    wrapper.setProps({ query: 'new query' });
    await mockAPI();

    wrapper.update();
    expect(
      wrapper.find('.suggestion').at(0).text()
    ).toEqual(hits[0].volumeInfo.title);
    expect(
      wrapper.find('.suggestion').at(1).text()
    ).toEqual(hits[1].volumeInfo.title);
  });

  it('should hide the autocomplete when the open prop is set to false', () => {
    wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      jest.fn(),
      true
    );
    wrapper.setState({ hits: hits });
    expect(wrapper.find('#autoCompList').props().style.display).toEqual('block');
    wrapper.setProps({ open: false });
    expect(wrapper.find('#autoCompList').props().style.display).toEqual('none');
  });

  it('should hide the autocomplete when there are no search results', () => {
    wrapper = mountComponent(
      -1,
      '',
      jest.fn(),
      jest.fn(),
      true
    );
    wrapper.setState({ hits: hits });
    expect(wrapper.find('#autoCompList').props().style.display).toEqual('block');
    wrapper.setState({ hits: [] });
    expect(wrapper.find('#autoCompList').props().style.display).toEqual('none');
  });
});
