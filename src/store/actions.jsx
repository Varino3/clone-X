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

export const login = (credentials) => ({
    type: 'LOGIN',
    payload: credentials,
});

export const setLoginError = (error) => ({
    type: 'SET_LOGIN_ERROR',
    payload: error,
});