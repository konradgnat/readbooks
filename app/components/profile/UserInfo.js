import React from 'react';

export default ({ avatar, user: { username, topFiveAuthors, interests, location } }) => {
  return (
    <div className="userInfo">
      <div className="ui grid">
        <div className="three wide column profile__avatar">
          <img src={avatar} className="ui small image" />
        </div>
        <div className="twelve wide column">
          <h1 className="ui header">{username}</h1>
        </div>
      </div>
      <div className="ui blue divider" />
      <p>
        <i className="book icon" />
        {topFiveAuthors}
      </p>
      <p>
        <i className="heart icon" />
        {interests}
      </p>
      <p>
        <i className="map pin icon" />
        {location}
      </p>
      <div className="ui blue divider" />
    </div>
  )
}