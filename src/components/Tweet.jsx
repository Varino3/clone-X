// components/Tweet.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Tweet = ({ tweet }) => {
  const [likes, setLikes] = useState(0);
  const [isShared, setIsShared] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const user = useSelector((state) => state.user);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleShare = () => {
    setIsShared(!isShared);
  };

  const handleEmailChange = (e) => {
    setShareEmail(e.target.value);
  };

  return (
    <div className="tweet">
      <p>
        <b>{user ? user.nombre_usuario : 'Usuario Desconocido'}</b>: {tweet.text}
      </p>
      <div className="tweet-buttons">
        <button onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} /> {likes}
        </button>
        <button onClick={handleShare} disabled={isShared}>
          <FontAwesomeIcon icon={faShare} /> Compartir
        </button>
        {isShared && (
          <div>
            <label htmlFor="shareEmail">Enviar a: </label>
            <input
              type="email"
              id="shareEmail"
              value={shareEmail}
              onChange={handleEmailChange}
              placeholder="Correo electrónico"
            />
            <button onClick={handleShare}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;
