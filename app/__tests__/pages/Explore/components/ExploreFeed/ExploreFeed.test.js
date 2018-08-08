import React from 'react';
import ExploreFeed from '../../../../../src/pages/Explore/components/ExploreFeed/ExploreFeed';
import { shallow } from 'enzyme';

describe('ExploreFeed', () => {

  it('renders correctly without any results', () => {
    const wrapper = shallow(<ExploreFeed/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with result array', () => {
    const hits = [
      {
        id: "_uTRAwAAQBAJ",
        volumeInfo: {
          title: "Practical Modern JavaScript",
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=9gUJAQAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
          },
          publishedDate: "1995-12-01"
        },
        searchInfo: {
          textSnippet: "Many webmasters don't have time to learn a high level programming language, "
        }
      },
      {
        id: "vmE4nBg4mpc",
        volumeInfo: {
          title: "Functional JavaScript",
          imageLinks: {
            smallThumbnail: "http://image.com"
          },
          publishedDate: "2009-12-01"
        },
        searchInfo: {
          textSnippet: "Lorem ipsum"
        }
      }
    ];
    const wrapper = mount(<ExploreFeed searchHits={hits}/>);
    // wrapper.setProps({ searchHits: hits });
    expect(wrapper).toMatchSnapshot();
  });
});
