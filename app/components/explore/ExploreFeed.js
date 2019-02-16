// @flow

import * as React from 'react';
import type { SearchResults } from '../../types/BooksAPI';
import './ExploreFeed.css';
import { Link } from 'react-router-dom';

type Props = {
  searchHits: Array<SearchResults>
};

class ExploreFeed extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  processPostFields = (hit: SearchResults) => {
    const thumbnail = hit.volumeInfo.imageLinks
      ? hit.volumeInfo.imageLinks.smallThumbnail
      : '/images/no_results.svg';
    const title = hit.volumeInfo.title;
    const publishedDate = hit.volumeInfo.publishedDate;
    const authors = hit.volumeInfo.authors ? hit.volumeInfo.authors.join(', ') : '';
    const description = hit.searchInfo ? hit.searchInfo.textSnippet : '';

    return { title, publishedDate, thumbnail, authors, description };
  };

  renderSearchHit = (hit: SearchResults): React.Element<'div'> => {
    const book = this.processPostFields(hit);
    const detail = {
      pathname: '/explore/' + hit.id,
      state: book
    };

    return (
      <div key={hit.id} className='feedItem ui segment'>
        <Link to={detail}>
          <div className="content">
            <div className="ui tiny left floated image">
              <img
                src={book.thumbnail}
                alt=""
              />
            </div>
            <div className="header">{book.title}</div>
            <div className="meta">{book.publishedDate}</div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: book.description
              }}
            />
          </div>
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div className='feedWrapper'>
        {this.props.searchHits.map(this.renderSearchHit)}
      </div>
    );
  }
}

export default ExploreFeed;
