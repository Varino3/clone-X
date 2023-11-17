import React from 'react';

const Tweet = ({ tweet, users, onDelete }) => {
  const userId = tweet.userId;
  const user = users.find((u) => u.uuid === userId) || {};

  return (
    <div className='tweet'>
      <div className='tweet-user'>
        Usuario: {tweet.nombre_usuario}
      </div>
      <div className='tweet-text'>{tweet.text}</div>
      {onDelete && (
        <button onClick={() => onDelete(tweet.id)}>Eliminar</button>
      )}
    </div>
  );
};

export default Tweet;
