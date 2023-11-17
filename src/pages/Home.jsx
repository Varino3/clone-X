// Home.jsx
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
      } catch (error) {
        console.error('Error al cargar los tweets:', error);
      }
    };

    // Cargar tweets y usuarios al cargar la página
    loadTweets();
  }, [user]);

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

  const handleDeleteTweet = async () => {
    // Implementa la lógica para actualizar el estado después de eliminar un tweet
    const allTweetsData = await getAllTweets();
    setAllTweets(allTweetsData);
    const currentUserTweets = user ? allTweetsData.filter(tweet => tweet.userId === user.uuid) : [];
    setCurrentTweets(currentUserTweets);
  };

  return (
    <div className='home-container'>
      <UserProfile />
      {user && (
        <div className='tweet-form'>
          <h2>Inicio</h2>
          <textarea
            rows="3"
            placeholder="Escribe un nuevo tweet"
            value={newTweetText}
            onChange={(e) => setNewTweetText(e.target.value)}
          />
          <button onClick={handleAddTweet}>Tweetear</button>
        </div>
      )}
      <TweetList tweets={currentTweets} users={users} onDelete={handleDeleteTweet} />
      {user && (
        <div className="news-container">
          <h2>Tweets de otros usuarios</h2>
          <TweetList tweets={allTweets.filter(tweet => tweet.userId !== user.uuid)} users={users} />
        </div>
      )}
      <NewsSection />
    </div>
  );
};

export default Home;
