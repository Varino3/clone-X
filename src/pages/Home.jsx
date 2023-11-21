// Home.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TweetList from '../components/TweetList';
import UserProfile from '../components/UserProfile';
import NewsSection from '../components/NewsSection';
import TopTweets from '../components/TopTweets';
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

        const sortedTweets = allTweetsData.sort((a, b) => b.id - a.id);
        setAllTweets(sortedTweets);

        setUsers(allUsersData);
        setSearchResults(sortedTweets);
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
          // Inicializar los "Me gusta" con 0 al agregar un nuevo tweet
          await addTweet(user.uuid, username, newTweetText);

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

      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar el tweet:', error);
      alert('Hubo un error al eliminar el tweet. Por favor, intenta de nuevo.');
    }
  };

  const handleSearch = () => {
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
            <button onClick={handleSearch}>Buscar</button>
          </div>
        </div>
      )}
      <TweetList tweets={searchResults.length === 0 ? allTweets : searchResults} users={users} onDelete={handleDeleteTweet} />
      <NewsSection />
      <TopTweets />
    </div>
  );
};

export default Home;
