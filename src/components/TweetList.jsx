// TweetList.jsx
import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets, users, onDelete }) => {
  return (
    <div className='tweet-list'>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} users={users} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TweetList;
