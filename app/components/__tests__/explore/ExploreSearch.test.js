import React from 'react';
import ExploreSearch from 'components/explore/ExploreSearch';
import { shallow } from 'enzyme';

describe('ExploreSearch', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ExploreSearch />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state value when query is entered', () => {
    const wrapper = shallow(<ExploreSearch />);
    wrapper
      .find('input[type="search"]')
      .simulate('change', { target: { value: 'some query' } });
    expect(wrapper.state('query')).toEqual('some query');
    expect(wrapper.state('value')).toEqual('some query');
  });

  it('should perform a search when search button is clicked', () => {
    const handleSearchSpy = jest.fn();
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.setState({ query: 'search query', open: true });
    wrapper
      .find('.search__submit')
      .simulate('click');
    expect(handleSearchSpy).toHaveBeenCalledWith('search query');
    expect(wrapper.instance().state.open).toEqual(false);
  });

  it('should set the value when a suggestion is clicked', () => {
    const handleSearchSpy = jest.fn();
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.find('Autocomplete').props().onClick('selected book title');
    expect(wrapper.state().value).toEqual('selected book title');
  });

  it('should close the autocomplete dropdown when a suggestion is clicked', () => {
    const handleSearchSpy = jest.fn();
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.setState({ open: true });
    wrapper.find('Autocomplete').props().onClick('selected book title');
    expect(wrapper.state().open).toEqual(false);
  });

  it('should reset the current index to -1 when a suggestion is clicked', () => {
    const handleSearchSpy = jest.fn();
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.setState({ currentIndex: 5 });
    wrapper.find('Autocomplete').props().onClick('selected book title');
    expect(wrapper.state().currentIndex).toEqual(-1);
  });

  it('should perform search when a suggestion is clicked', () => {
    const handleSearchSpy = jest.fn();
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.find('Autocomplete').props().onClick('selected book title');
    expect(handleSearchSpy).toHaveBeenCalled();
  });

  it('should update the suggestions array when new suggestions are passed', () => {
    const handleSearchSpy = jest.fn();
    const hits = ['book one', 'book two'];
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.find('Autocomplete').props().onSuggestions(hits);
    expect(wrapper.state().suggestions).toEqual(hits);
  });

  it('should set the current index to -1 when new suggestions are passed', () => {
    const handleSearchSpy = jest.fn();
    const hits = ['book one', 'book two'];
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.setState({ currentIndex: 5 });
    wrapper.find('Autocomplete').props().onSuggestions(hits);
    expect(wrapper.state().currentIndex).toEqual(-1);
  });

  it('should open the suggestions dropdown when new suggestions are passed', () => {
    const handleSearchSpy = jest.fn();
    const hits = ['book one', 'book two'];
    const wrapper = shallow(<ExploreSearch handleSearch={handleSearchSpy}/>);
    wrapper.find('Autocomplete').props().onSuggestions(hits);
    expect(wrapper.state().open).toEqual(true);
  });

  describe('should respond to input from keyboard', () => {
    let wrapper, event;

    beforeEach(() => {
      wrapper = shallow(<ExploreSearch />);
      wrapper.instance().suggestions = [
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
      event = { preventDefault: jest.fn() };
    });

    it('should increment currentIndex count on ArrowDown', () => {
      wrapper
        .find('input[type="search"]')
        .simulate('keydown', { key: 'ArrowDown', ...event });
      expect(wrapper.state('currentIndex')).toEqual(0);
      expect(wrapper.state('open')).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not increment currentIndex on ArrowDown when at end of list', () => {
      wrapper.setState({ currentIndex: 1 });
      wrapper
        .find('input[type="search"]')
        .simulate('keydown', { key: 'ArrowDown', ...event });
      expect(wrapper.state('currentIndex')).toEqual(1);
      expect(wrapper.state('open')).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should decrement currentIndex on ArrowUp', () => {
      wrapper.setState({ currentIndex: 1, open: true });
      wrapper
        .find('input[type="search"]')
        .simulate('keydown', { key: 'ArrowUp', ...event });
      expect(wrapper.state('currentIndex')).toEqual(0);
      expect(wrapper.state('open')).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should decrement currentIndex on ArrowUp and close when at first item', () => {
      wrapper.setState({ currentIndex: -1, open: true });
      wrapper
        .find('input[type="search"]')
        .simulate('keydown', { key: 'ArrowUp', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not decrement currentIndex on ArrowUp when at beginning', () => {
      wrapper.setState({ currentIndex: -1 });
      wrapper
        .find('input[type="search"]')
        .simulate('keydown', { key: 'ArrowUp', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should close list on Escape', () => {
      wrapper.setState({ currentIndex: 1, open: true });
      wrapper
        .find('input[type="search"]')
        .simulate('keydown', { key: 'Escape', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should set value, reset currentIndex and close list on Enter', () => {
      wrapper.setState({ currentIndex: 1, open: true });
      wrapper
        .find('input[type="search"]')
        .simulate('keydown', { key: 'Enter', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(wrapper.state('value')).toEqual('Title 2');
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
