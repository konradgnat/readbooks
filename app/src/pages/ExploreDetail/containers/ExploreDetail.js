// @flow

import * as React from "react";
import type { TitleResults } from "../../../types/BooksAPI";
import styles from "./ExploreDetail.css";

type Props = {
  location: {
    state: TitleResults
  }
};

export default class ExploreDetail extends React.Component<Props> {
  render() {
    const imageUrl = this.props.location.state.volumeInfo.imageLinks
      ? this.props.location.state.volumeInfo.imageLinks.smallThumbnail
      : "/images/no_results.svg";
    const title = this.props.location.state
      ? this.props.location.state.volumeInfo.title
      : "";
    const publishedDate = this.props.location.state
      ? this.props.location.state.volumeInfo.publishedDate
      : "";

    let authors = "";
    if (this.props.location.state.volumeInfo.authors) {
      authors = this.props.location.state.volumeInfo.authors.join(", ");
    }

    return (
      <div className="segment">
        <div className="ui items">
          <div className="ui item">
            <div className="ui tiny-image">
              <img src={imageUrl} alt="" />
            </div>
            <div className={styles.detailContent}>
              <div className="content">
                <h1 className="ui header">{title}</h1>
                <button className="ui mini positive basic button">
                  Add to reading list
                </button>
                <div className="meta">
                  <span className={styles.detailMeta}>Authors: {authors}</span>
                  <span className={styles.detailMeta}>
                    Published: {publishedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 className="ui header">Description</h4>
        <p>{this.props.location.state.volumeInfo.description}</p>
      </div>
    );
  }
}
