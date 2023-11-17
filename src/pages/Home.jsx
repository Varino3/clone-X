import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TweetList from '../components/TweetList';
import UserProfile from '../components/UserProfile';
import NewsSection from '../components/NewsSection';
import { addTweet, getAllTweets, getAllUsers, deleteTweet } from '../components/indexedDB';

const Home = () => {
  const user = useSelector((state) => state.user);
  const [newTweetText, setNewTweetText] = useState('');
  const [currentTweets, setCurrentTweets] = useState([]);
  const [allTweets, setAllTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        // Obtener todos los tweets y usuarios de IndexedDB
        const allTweetsData = await getAllTweets();
        const allUsersData = await getAllUsers();

        setAllTweets(allTweetsData);
        setUsers(allUsersData);

        // Filtrar los tweets para el usuario actual
        const currentUserTweets = user ? allTweetsData.filter(tweet => tweet.userId === user.uuid) : [];
        setCurrentTweets(currentUserTweets);

        // Si no hay término de búsqueda, ordenar los tweets de más nuevo a más antiguo
        if (!searchTerm) {
          const sortedTweets = allTweetsData.sort((a, b) => b.id - a.id);
          setAllTweets(sortedTweets);
        }

        // Filtrar los tweets según el término de búsqueda
        const filteredTweets = allTweetsData.filter(
          tweet =>
            tweet.text.includes(searchTerm) || tweet.nombre_usuario.includes(searchTerm)
        );
        setSearchResults(filteredTweets);
      } catch (error) {
        console.error('Error al cargar los tweets:', error);
      }
    };

    // Cargar tweets y usuarios al cargar la página
    loadTweets();
  }, [user, searchTerm]);

  const handleAddTweet = async () => {
    if (user) {
      if (newTweetText.trim() !== '') {
        // Obtener el nombre de usuario actual directamente del objeto user
        const username = user.nombre_usuario || 'Usuario Desconocido';

        // Añadir el tweet a IndexedDB
        await addTweet(user.uuid, username, newTweetText);

        // Obtener todos los tweets y usuarios de IndexedDB después de agregar el tweet
        const allTweetsData = await getAllTweets();
        const allUsersData = await getAllUsers();

        setAllTweets(allTweetsData);
        setUsers(allUsersData);

        // Filtrar los tweets para el usuario actual
        const currentUserTweets = user ? allTweetsData.filter(tweet => tweet.userId === user.uuid) : [];
        setCurrentTweets(currentUserTweets);

        setNewTweetText('');
      }
    } else {
      console.log('Debes iniciar sesión para escribir un tweet.');
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await deleteTweet(tweetId);

      // Actualizar la lista de tweets después de eliminar uno
      const allTweetsData = await getAllTweets();
      setAllTweets(allTweetsData);

      // Filtrar los tweets para el usuario actual después de eliminar uno
      const currentUserTweets = user ? allTweetsData.filter(tweet => tweet.userId === user.uuid) : [];
      setCurrentTweets(currentUserTweets);
    } catch (error) {
      console.error('Error al eliminar el tweet:', error);
    }
  };

  const handleSearch = () => {
    // Filtrar los tweets según el término de búsqueda al hacer clic en el botón
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
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Buscar tweets'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      <TweetList tweets={searchTerm ? searchResults : currentTweets} users={users} onDelete={handleDeleteTweet} />
      {user && (
        <div className='news-container'>
          <h2>Tweets de otros usuarios</h2>
          <TweetList
            tweets={searchResults.length === 0 && !searchTerm ? [] : allTweets.filter((tweet) => tweet.userId !== user.uuid)}
            users={users}
            onDelete={handleDeleteTweet}
          />
        </div>
      )}
      <NewsSection />
    </div>
  );
};

export default Home;
