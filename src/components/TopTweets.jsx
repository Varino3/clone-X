// TopTweets.jsx
import React, { useState, useEffect } from 'react';
import { getAllTweets, getAllUsers } from '../components/indexedDB';
import TweetList from '../components/TweetList';

const TopTweets = () => {
    const [allTweets, setAllTweets] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadTweets = async () => {
            try {
                const allTweetsData = await getAllTweets();
                const allUsersData = await getAllUsers();

                // Ordenar los tweets por cantidad de likes
                const sortedTweets = allTweetsData.sort((a, b) => (b.likes || 0) - (a.likes || 0));

                // Obtener solo los primeros tres tweets después de ordenar
                const topThreeTweets = sortedTweets.slice(0, 3);

                setAllTweets(topThreeTweets);
                setUsers(allUsersData);
            } catch (error) {
                console.error('Error al cargar los tweets:', error);
            }
        };

        loadTweets();
    }, []);

    return (
        <div>
            <h2>Tweets más gustados</h2>
            <TweetList tweets={allTweets} users={users} />
        </div>
    );
};

export default TopTweets;
