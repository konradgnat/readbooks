import React from 'react';
import ExploreSearch from '../../components/ExploreSearch';
import { shallow } from 'enzyme';

describe('ExploreSearch', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<ExploreSearch/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should initialize with state value', () => {
    const wrapper = shallow(<ExploreSearch/>);
    wrapper.find('input[type="search"]').simulate('change', { target: { value: 'some query' }});
    expect(wrapper.state('query')).toEqual('some query');
    expect(wrapper.state('value')).toEqual('some query');
  });

  describe('should respond to input from keyboard', () => {
    let wrapper, event;

    beforeEach(() => {
      wrapper = shallow(<ExploreSearch/>);
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
      wrapper.find('input[type="search"]').simulate('keydown', { key: 'ArrowDown', ...event });
      expect(wrapper.state('currentIndex')).toEqual(0);
      expect(wrapper.state('open')).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not increment currentIndex on ArrowDown when at end of list', () => {
      wrapper.setState({ currentIndex: 1 });
      wrapper.find('input[type="search"]').simulate('keydown', { key: 'ArrowDown', ...event });
      expect(wrapper.state('currentIndex')).toEqual(1);
      expect(wrapper.state('open')).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should decrement currentIndex on ArrowUp', () => {
      wrapper.setState({ currentIndex: 1, open: true });
      wrapper.find('input[type="search"]').simulate('keydown', { key: 'ArrowUp', ...event });
      expect(wrapper.state('currentIndex')).toEqual(0);
      expect(wrapper.state('open')).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should decrement currentIndex on ArrowUp and close when at first item', () => {
      wrapper.setState({ currentIndex: -1, open: true });
      wrapper.find('input[type="search"]').simulate('keydown', { key: 'ArrowUp', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not decrement currentIndex on ArrowUp when at beginning', () => {
      wrapper.setState({ currentIndex: -1 });
      wrapper.find('input[type="search"]').simulate('keydown', { key: 'ArrowUp', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should close list on Escape', () => {
      wrapper.setState({ currentIndex: 1, open: true });
      wrapper.find('input[type="search"]').simulate('keydown', { key: 'Escape', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should set value, reset currentIndex and close list on Enter', () => {
      wrapper.setState({ currentIndex: 1, open: true });
      wrapper.find('input[type="search"]').simulate('keydown', { key: 'Enter', ...event });
      expect(wrapper.state('currentIndex')).toEqual(-1);
      expect(wrapper.state('open')).toBe(false);
      expect(wrapper.state('value')).toEqual('Title 2');
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
