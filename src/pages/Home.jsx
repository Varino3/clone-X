// Home.jsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TweetList from '../components/TweetList';
import UserProfile from '../components/UserProfile';
import NewsSection from '../components/NewsSection';
import { addTweet, getAllTweets, getAllUsers } from '../components/indexedDB';

const Home = () => {
  // Obtiene el usuario del estado global de Redux
  const user = useSelector((state) => state.user);

  // Estados locales para el texto del nuevo tweet y las listas de tweets y usuarios
  const [newTweetText, setNewTweetText] = useState('');
  const [currentTweets, setCurrentTweets] = useState([]);
  const [allTweets, setAllTweets] = useState([]);
  const [users, setUsers] = useState([]);

  // Efecto de carga al montar el componente o cuando cambia el usuario
  useEffect(() => {
    const loadTweets = async () => {
      try {
        // Obtener todos los tweets y usuarios de IndexedDB
        const allTweetsData = await getAllTweets();
        const allUsersData = await getAllUsers();

        // Actualiza los estados locales con los datos obtenidos
        setAllTweets(allTweetsData);
        setUsers(allUsersData);

        // Filtra los tweets para el usuario actual
        const currentUserTweets = user ? allTweetsData.filter(tweet => tweet.userId === user.uuid) : [];
        setCurrentTweets(currentUserTweets);
      } catch (error) {
        console.error('Error al cargar los tweets:', error);
      }
    };

    // Cargar tweets y usuarios al montar el componente o cuando cambia el usuario
    loadTweets();
  }, [user]);

  // Manejador de evento para añadir un nuevo tweet
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

        // Actualiza los estados locales con los datos obtenidos
        setAllTweets(allTweetsData);
        setUsers(allUsersData);

        // Filtra los tweets para el usuario actual
        const currentUserTweets = user ? allTweetsData.filter(tweet => tweet.userId === user.uuid) : [];
        setCurrentTweets(currentUserTweets);

        // Reinicia el texto del nuevo tweet
        setNewTweetText('');
      }
    } else {
      console.log('Debes iniciar sesión para escribir un tweet.');
    }
  };

  // Renderiza la interfaz de usuario con perfiles, formularios de tweets y listas de tweets
  return (
    <div className='home-container'>
      <UserProfile />
      {/* Renderiza el formulario de tweet solo si hay un usuario autenticado */}
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
      {/* Renderiza la lista de tweets del usuario actual */}
      <TweetList tweets={currentTweets} users={users} />
      {/* Renderiza la sección de tweets de otros usuarios solo si hay un usuario autenticado */}
      {user && (
        <div className="news-container">
          <h2>Tweets de otros usuarios</h2>
          {/* Filtra y renderiza la lista de tweets de otros usuarios */}
          <TweetList tweets={allTweets.filter(tweet => tweet.userId !== user.uuid)} users={users} />
        </div>
      )}
      {/* Renderiza la sección de noticias */}
      <NewsSection />
    </div>
  );
};

export default Home;
