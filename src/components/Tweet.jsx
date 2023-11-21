import React, { useState, useEffect } from 'react';

const Tweet = ({ tweet, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];
    setLiked(likedTweets.includes(tweet.id));

    setLikesCount(tweet.likes || 0);
  }, [tweet.likes, tweet.id]);

  const handleLike = () => {
    const likedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];

    if (!liked) {
      likedTweets.push(tweet.id);
    } else {
      const updatedLikedTweets = likedTweets.filter((likedTweetId) => likedTweetId !== tweet.id);
      localStorage.setItem('likedTweets', JSON.stringify(updatedLikedTweets));
    }

    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleStorageChange = () => {
    const updatedLikedTweets = JSON.parse(localStorage.getItem('likedTweets')) || [];
    setLiked(updatedLikedTweets.includes(tweet.id));
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

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
        <button onClick={() => onDelete(tweet.id)}>Eliminar</button>
      )}
    </div>
  );
};

export default Tweet;
