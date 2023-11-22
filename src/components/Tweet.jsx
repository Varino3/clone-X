// Tweet.jsx
import React, { useState, useEffect } from 'react';
import { addLike, removeLike, getLikesForTweet, getLikedTweets } from '../components/indexedDB';

const Tweet = ({ tweet, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const loadLikes = async () => {
      try {
        // Obtener la cantidad de likes del tweet desde la base de datos
        // (Deberías tener una función en indexedDB para obtener likes de un tweet específico)
        const likes = await getLikesForTweet(tweet.id);
        setLikesCount(likes);

        // Verificar si el usuario ha dado like al tweet en el pasado
        const likedTweets = await getLikedTweets();
        setLiked(likedTweets.includes(tweet.id));
      } catch (error) {
        console.error('Error al cargar los likes del tweet:', error);
      }
    };

    loadLikes();
  }, [tweet.id]);

  const handleLike = async () => {
    try {
      if (!liked) {
        // Dar like al tweet
        await addLike(tweet.id);

        // Actualizar el estado local
        setLikesCount(likesCount + 1);
        setLiked(true);
      } else {
        // Quitar like al tweet
        await removeLike(tweet.id);

        // Actualizar el estado local
        setLikesCount(likesCount - 1);
        setLiked(false);
      }
    } catch (error) {
      console.error('Error al manejar el like del tweet:', error);
    }
  };

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
      <div className='tweet-options'>
        <button>Compartir</button>
        {onDelete && (
          <button onClick={() => onDelete(tweet.id)}>Eliminar</button>
        )}
      </div>
    </div>
  );
};

export default Tweet;
