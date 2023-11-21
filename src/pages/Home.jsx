// components/Home.jsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TweetList from '../components/TweetList';
import UserProfile from '../components/UserProfile';
import NewsSection from '../components/NewsSection';
import { addTweet, getAllTweets, getAllUsers, deleteTweet } from '../components/indexedDB';

const Home = () => {
  const user = useSelector((state) => state.user);
  const [newTweetText, setNewTweetText] = useState('');
  const [allTweets, setAllTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const allTweetsData = await getAllTweets();
        const allUsersData = await getAllUsers();

        // Ordenar los tweets de más reciente a más antiguo
        const sortedTweets = allTweetsData.sort((a, b) => b.id - a.id);
        setAllTweets(sortedTweets);

        setUsers(allUsersData);
        setSearchResults(sortedTweets); // Mostrar todos los tweets por defecto
      } catch (error) {
        console.error('Error al cargar los tweets:', error);
      }
    };

    loadTweets();
  }, []);

  const handleAddTweet = async () => {
    if (user) {
      if (newTweetText.trim() !== '') {
        const username = user.nombre_usuario || 'Usuario Desconocido';

        try {
          await addTweet(user.uuid, username, newTweetText);

          // Recargar la página después de agregar un tweet
          window.location.reload();
        } catch (error) {
          console.error('Error al agregar el tweet:', error);
          alert('Hubo un error al agregar el tweet. Por favor, intenta de nuevo.');
        }
      }
    } else {
      console.log('Debes iniciar sesión para escribir un tweet.');
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await deleteTweet(tweetId);

      // Recargar la página después de eliminar un tweet
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar el tweet:', error);
      alert('Hubo un error al eliminar el tweet. Por favor, intenta de nuevo.');
    }
  };

  const handleSearch = () => {
    // Filtrar los tweets solo cuando se hace clic en el botón de búsqueda
    const filteredTweets = allTweets.filter(
      tweet =>
        tweet.text.includes(searchTerm) || tweet.nombre_usuario.includes(searchTerm)
    );
    setSearchResults(filteredTweets);
  };

  return (
    <div className='home-container'>
      <UserProfile />
      {user && (
        <div className='tweet-form'>
          <h2>Inicio</h2>
          <textarea
            rows='3'
            placeholder='Escribe un nuevo tweet'
            value={newTweetText}
            onChange={(e) => setNewTweetText(e.target.value)}
          />
          <button onClick={handleAddTweet}>Tweetear</button>

          {/* Barra de búsqueda para filtrar tweets */}
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Buscar tweets'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>
        </div>
      )}
      {/* Mostrar la lista de tweets según el término de búsqueda o todos los tweets */}
      <TweetList tweets={searchResults.length === 0 ? allTweets : searchResults} users={users} onDelete={handleDeleteTweet} />
      {/* Sección de noticias (puedes personalizar este componente según tus necesidades) */}
      <NewsSection />
    </div>
  );
};

export default Home;
