// store/actions.jsx
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const addTweet = (tweet) => ({
    type: 'ADD_TWEET',
    payload: tweet,
});
