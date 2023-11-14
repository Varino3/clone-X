// components/TweetList.jsx
import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets }) => {
    // Invierte el orden de los tweets
    const reversedTweets = [...tweets].reverse();

    return (
        <div className="tweet-list">
            {reversedTweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
};

export default TweetList;
