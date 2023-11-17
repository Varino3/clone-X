// Tweet.jsx
import React from 'react';

const Tweet = ({ tweet, users }) => {
  const userId = tweet.userId;

  // Buscar el usuario por su ID en el array de usuarios
  const user = users.find(user => user.uuid === userId) || {};

  return (
    <div className='tweet'>
      <div className='tweet-user'>
        Usuario: {tweet.nombre_usuario}
      </div>
      <div className='tweet-text'>{tweet.text}</div>
    </div>
  );
};

export default Tweet;
