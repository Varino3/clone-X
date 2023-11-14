// components/Tweet.jsx
import React from 'react';

const Tweet = ({ tweet }) => {
    return (
        <div className="tweet">
            <p>{tweet.text}</p>
            {/* Puedes agregar más elementos según sea necesario, como botones de "Me gusta" o "Retweet" */}
        </div>
    );
};

export default Tweet;
