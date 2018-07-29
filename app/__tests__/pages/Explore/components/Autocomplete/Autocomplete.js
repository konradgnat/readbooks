import React from 'react';
import Autocomplete from '../../../../../src/pages/Explore/components/Autocomplete/Autocomplete';
import { shallow, mount } from 'enzyme';
import apiCaller from '../../../../../src/util/apiCaller';

jest.mock('../../../../../src/util/apiCaller', () => jest.fn());

describe('Autocomplete', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<Autocomplete/>);
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
    const mockAPI = apiCaller.mockImplementation(() => Promise.resolve({ items: hits }));
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
});