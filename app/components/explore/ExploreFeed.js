// @flow

import * as React from 'react';
import type { TitleResults } from 'app/types/BooksAPI';
import styles from './ExploreFeed.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

type Props = {
  searchHits: Array<TitleResults>
};

class ExploreFeed extends React.Component<Props> {
  cx = classNames.bind(styles);

  constructor(props: Props) {
    super(props);
  }

  separatePostFields = (hit) => {
    let thumbnail = hit.volumeInfo.imageLinks
      ? hit.volumeInfo.imageLinks.smallThumbnail
      : '/images/no_results.svg';
    let title = hit.volumeInfo.title;
    let publishedDate = hit.volumeInfo.publishedDate;
    let authors = hit.volumeInfo.authors.join(', ');
    let description = hit.searchInfo ? hit.searchInfo.textSnippet : '';

    return { title, publishedDate, thumbnail, authors, description };
  };

  renderSearchHit = (hit: TitleResults): React.Element<'div'> => {
    let feedItemClassNames = this.cx({
      feedItem: true,
      ui: true,
      segment: true
    });
    let book = this.separatePostFields(hit);
    const detail = {
      pathname: '/explore/' + hit.id,
      state: book
    };

    return (
      <div key={hit.id} className={feedItemClassNames}>
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
      <div className={styles.feedWrapper}>
        {this.props.searchHits.map(this.renderSearchHit)}
      </div>
    );
  }
}

export default ExploreFeed;
