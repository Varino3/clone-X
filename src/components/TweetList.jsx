// TweetList.jsx
import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets, users, onDelete }) => {
  // Invierte el orden de los tweets para mostrar los más nuevos primero
  const reversedTweets = [...tweets].reverse();

  return (
    <div className='tweet-list'>
      {reversedTweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} users={users} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TweetList;
