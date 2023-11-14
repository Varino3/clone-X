// store/reducers.js
import { combineReducers } from 'redux';

// Reducer para el usuario
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
};

// Reducer para los tweets
const tweetsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TWEET':
            return [...state, action.payload];
        default:
            return state;
    }
};

// Combinar los reducers
const rootReducer = combineReducers({
    user: userReducer,
    tweets: tweetsReducer,
    // Puedes agregar más reducers según sea necesario
});

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

export default rootReducer;
