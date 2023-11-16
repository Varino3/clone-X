// TweetList.jsx
import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets, users }) => {
  return (
    <div className='tweet-list'>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} users={users} />
      ))}
    </div>
  );
};

export default TweetList;
