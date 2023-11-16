// actions.jsx
export const setUser = (user) => ({
    type: 'SET_USER',
    user,
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const login = (username, password) => ({
    type: 'LOGIN',
    username,
    password,
});

export const addAutoUserTweet = (tweet) => ({
    type: 'ADD_AUTO_USER_TWEET',
    tweet,
});

export const setInitialTweets = (tweets) => ({
    type: 'SET_INITIAL_TWEETS',
    tweets,
});

export const addNewTweet = (tweet) => ({
    type: 'ADD_NEW_TWEET',
    tweet,
});
