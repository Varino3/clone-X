//Tweet.jsx

import React, { useState, useEffect } from 'react';

const Tweet = ({ tweet, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];

    // Verificar si el tweet actual está en la lista de tweets que le gustan al usuario
    setLiked(likedTweets.includes(tweet.id));

    // Establecer el recuento de "me gusta" del tweet, si está definido, de lo contrario 0
    setLikesCount(tweet.likes || 0);
  }, [tweet.likes, tweet.id]);

  // Manejar el evento de hacer clic en el botón de "me gusta" / "no me gusta"
  const handleLike = () => {
    // Obtener la lista de tweets que le gustan al usuario desde el almacenamiento local
    const likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];

    if (!liked) {
      // Si el usuario no le ha dado "me gusta" al tweet, agregarlo a la lista
      likedTweets.push(tweet.id);
    } else {
      // Si el usuario ya le dio "me gusta" al tweet, quitarlo de la lista
      const updatedLikedTweets = likedTweets.filter((likedTweetId) => likedTweetId !== tweet.id);
      localStorage.setItem('likedTweets', JSON.stringify(updatedLikedTweets));
    }

    setLiked(!liked);

    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  // Manejar el cambio en el almacenamiento local para reflejar "me gusta" en otros componentes
  const handleStorageChange = () => {
    const updatedLikedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];
    setLiked(updatedLikedTweets.includes(tweet.id));
  };

  // Agregar un evento de escucha para el cambio en el almacenamiento local
  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    // Limpiar el evento de escucha al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tweet.id]);

  return (
    <div className='tweet'>
      <div className='tweet-user'>
        Usuario: {tweet.nombre_usuario}
      </div>
      <div className='tweet-text'>{tweet.text}</div>
      <div className='tweet-likes'>
        <span>Likes: {likesCount}</span>
        <button onClick={handleLike} className={liked ? 'liked' : ''}>
          {liked ? '❤️ No me gusta' : '🤍 Me gusta'}
        </button>
      </div>
      {onDelete && (
        <div className='tweet-options'>
          <button>Compartir</button>
          <button onClick={() => onDelete(tweet.id)}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default Tweet;
