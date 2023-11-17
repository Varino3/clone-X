// Tweet.jsx
import React from 'react';
import { deleteTweet } from './indexedDB';

const Tweet = ({ tweet, users, onDelete }) => {
  const userId = tweet.userId;
  const user = users.find((u) => u.uuid === userId) || {};

  const handleDelete = async () => {
    try {
      await deleteTweet(tweet.id);
      onDelete();
    } catch (error) {
      console.error('Error al eliminar el tweet:', error);
    }
  };

  return (
    <div className='tweet'>
      <div className='tweet-user'>
        Usuario: {user.nombre_usuario}
      </div>
      <div className='tweet-text'>{tweet.text}</div>
      {onDelete && (
        <button onClick={handleDelete}>Eliminar</button>
      )}
    </div>
  );
};

export default Tweet;
