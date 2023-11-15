// pages/Home.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TweetList from '../components/TweetList';
import UserProfile from '../components/UserProfile';
import { addTweet } from '../store/actions';

const Home = () => {
    const user = useSelector((state) => state.user);
    const tweets = useSelector((state) => state.tweets);
    const dispatch = useDispatch();

    const [newTweetText, setNewTweetText] = useState('');

    const handleAddTweet = () => {
        if (user) {
            // Verificar si el usuario ha iniciado sesión antes de agregar un tweet
            if (newTweetText.trim() !== '') {
                const newTweet = {
                    id: Date.now(),
                    text: newTweetText,
                };
                dispatch(addTweet(newTweet));
                setNewTweetText('');
            }
        } else {
            // Mostrar un mensaje o redirigir a la página de inicio de sesión
            console.log('Debes iniciar sesión para escribir un tweet.');
        }
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
            <TweetList tweets={tweets} />
        </div>
    );
};

export default Home;
