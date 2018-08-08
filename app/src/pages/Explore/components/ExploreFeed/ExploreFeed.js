// @flow

import * as React from 'react';
import type { TitleResults } from '../../../../types/BooksAPI';
import styles from './ExploreFeed.css';
import classNames from 'classnames/bind';

type Props = {
  searchHits:  Array<TitleResults>
};

class ExploreFeed extends React.Component<Props>  {

  cx = classNames.bind(styles);

  constructor(props: Props) {
    super(props);

  }

  renderSearchHit = (hit: TitleResults): React.Element<'div'> => {
    let feedItemClassNames = this.cx({
      feedItem: true,
      ui: true,
      segment: true
    });

    return(
      <div key={hit.id} className={feedItemClassNames}>
        <div className="content">
          <div className="ui tiny left floated image">
            <img src={hit.volumeInfo.imageLinks ? hit.volumeInfo.imageLinks.smallThumbnail : '/images/no_results.svg'} alt=""/>
          </div>
          <div className="header">
            {hit.volumeInfo.title}
          </div>
          <div className="meta">
            {hit.volumeInfo.publishedDate}
          </div>
          <div className="description"
               dangerouslySetInnerHTML={{__html: hit.searchInfo ? hit.searchInfo.textSnippet : null}}
               />
        </div>
      </div>
    )
  };

  render() {
    console.log(this.props.searchHits);

    return (
      <div className={styles.feedWrapper}>
        { this.props.searchHits.map(this.renderSearchHit) }
      </div>
    )
  }
}

export default ExploreFeed;