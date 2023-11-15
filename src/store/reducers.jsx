// store/reducers.jsx
import { combineReducers } from 'redux';

// Reducer para el usuario
export const userReducer = (state = null, action) => {
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
export const tweetsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TWEET':
            return [...state, action.payload];
        default:
            return state;
    }
};

// Reducer para los usuarios
export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return action.payload;
        default:
            return state;
    }
};

// Combinar los reducers
const rootReducer = combineReducers({
    user: userReducer,
    tweets: tweetsReducer,
    users: usersReducer,
});

export default rootReducer;
