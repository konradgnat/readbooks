// @flow
import * as React from 'react';
import 'components/profile/Posts.css';

type Props = {
  post: Object
};

export default ({ thumbnail, title, thoughts, _id }: Props) => {
  return (
    <div className="item profile__post">
      <div className="ui tiny image profile__img_wrapper">
        <img
          className="book_thumbnail profile__img"
          src={thumbnail}
        />
      </div>
      <div className="content">
        <div className="header">{title}</div>
        <div className="post__desc">{thoughts.substring(0, 100) + '...'}</div>
        <a className="read_more" href={`/posts/${_id}`}>read more</a>
      </div>
    </div>
  );
};
