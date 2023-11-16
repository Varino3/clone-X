// store/reducers.jsx
import { combineReducers } from 'redux';

// Reducer usuario único
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user; // Asegúrate de que action.user tenga el formato correcto
        case 'LOGOUT':
            return null;
        // Otros casos según las acciones relacionadas con el usuario
        default:
            return state;
    }
};
// Reducer todos usuarios
export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return action.payload;
        default:
            return state;
    }
};

// Reducer tweets
const tweetsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INITIAL_TWEETS':
            return action.tweets;
        case 'ADD_NEW_TWEET':
            return [...state, action.tweet];
        // Otros casos según las acciones relacionadas con los tweets
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
