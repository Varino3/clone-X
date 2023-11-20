import React from 'react';

// Componente funcional Tweet que representa un tweet individual
const Tweet = ({ tweet, onDelete }) => {

  return (
    <div className='tweet'>
      {/* Mostrar el nombre de usuario y el texto del tweet */}
      <div className='tweet-user'>
        Usuario: {tweet.nombre_usuario}
      </div>
      <div className='tweet-text'>{tweet.text}</div>

      {/* Mostrar el botón de eliminar solo si la función onDelete está definida */}
      {onDelete && (
        <button onClick={() => onDelete(tweet.id)}>Eliminar</button>
      )}
    </div>
  );
};

// Exportar el componente Tweet para su uso en otros archivos
export default Tweet;
