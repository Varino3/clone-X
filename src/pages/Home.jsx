// pages/Home.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TweetList from '../components/TweetList';
import { addTweet } from '../store/reducers';

const Home = () => {
    const tweets = useSelector((state) => state.tweets);
    const dispatch = useDispatch();

    const [newTweetText, setNewTweetText] = useState('');

    const handleAddTweet = () => {
        if (newTweetText.trim() !== '') {
            const newTweet = {
                id: Date.now(),
                text: newTweetText,
            };
            dispatch(addTweet(newTweet));
            setNewTweetText('');
        }
    };

    return (
        <div className='home-container'>
            <h2>Inicio</h2>
            <div className='tweet-form'>
                <textarea
                    rows="3"
                    placeholder="Escribe tu nuevo tweet"
                    value={newTweetText}
                    onChange={(e) => setNewTweetText(e.target.value)}
                />
                <button onClick={handleAddTweet}>Agregar Tweet</button>
            </div>
            <TweetList tweets={tweets} />
        </div>
    );
};

export default Home;
