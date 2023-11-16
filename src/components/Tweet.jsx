// Tweet.jsx
import React from 'react';

const Tweet = ({ tweet, users }) => {
  const userId = tweet.userId;
  const user = users[userId] || {}; // Obtén el usuario por ID

  return (
    <div className='tweet'>
      <div className='tweet-user'>
        Usuario: {user.nombre_usuario}
      </div>
      <div className='tweet-text'>{tweet.text}</div>
    </div>
  );
};

export default Tweet;
