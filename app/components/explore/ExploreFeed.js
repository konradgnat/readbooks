// @flow
import * as React from 'react';
import type { SearchResults } from 'types/Posts';
import 'components/explore/ExploreFeed.css';
import { Link } from 'react-router-dom';

// Todo: add pagination
// Todo: consider removing autocomplete, it sometimes exceeds api limit, breaking search results

type Props = {
  searchHits: Array<SearchResults>
};

export const DEFAULT_IMAGE_PATH = '/images/no_results.svg';

class ExploreFeed extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  processPostFields = (hit: SearchResults) => {
    const {
      searchInfo,
      volumeInfo:
        {
          imageLinks,
          title,
          publishedDate,
          authors
        }
    } = hit;
    const thumbnail = imageLinks
      ? imageLinks.smallThumbnail
      : DEFAULT_IMAGE_PATH;
    const authorsJoined = authors ? authors.join(', ') : '';
    const description = searchInfo ? searchInfo.textSnippet : '';
    // format from yyyy-mm-dd to mm/dd/yyy or yyyy
    const formattedPubDate
      = publishedDate
      ? publishedDate
      .replace(
        /(\d{4})-?(\d{2})?-?(\d{2})?/,
        (match, g1, g2, g3) => (g1 && g2 && g3) ? `${g2}/${g3}/${g1}` : g1
      ) : '';

    return { title, formattedPubDate, thumbnail, authorsJoined, description };
  };

  renderSearchHit = (hit: SearchResults): React.Element<'div'> => {
    const book = this.processPostFields(hit);
    const detail = {
      pathname: '/explore/' + hit.id,
      state: book
    };

    return (
      <div key={hit.id} className='feed__item ui segment'>
        <Link className="feed__item_link" to={detail}>
          <div className="content">
            <div className="ui tiny left floated image">
              <img
                src={book.thumbnail}
                alt=""
              />
            </div>
            <h3 className="header feed__item_title">{book.title}</h3>
            <div className="meta authors">{book.authorsJoined}</div>
            <div className="meta feed__item_date">{book.formattedPubDate}</div>
            <div
              className="description feed__item_description"
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
      <div className='feed'>
        {this.props.searchHits.map(this.renderSearchHit)}
      </div>
    );
  }
}

export default ExploreFeed;
