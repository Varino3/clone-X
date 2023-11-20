import { combineReducers } from 'redux';

// Reducer para el usuario único
const userReducer = (state = null, action) => {
    switch (action.type) {
        // Establece el usuario en el estado de la aplicación
        case 'SET_USER':
            return action.user;
        // Realiza la acción de cerrar sesión, eliminando la información del usuario del estado.
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
};

// Reducer para todos los usuarios
export const usersReducer = (state = [], action) => {
    switch (action.type) {
        // Carga los usuarios en el estado de la aplicación
        case 'LOAD_USERS':
            return action.payload;
        default:
            return state;
    }
};

// Reducer para los tweets
const tweetsReducer = (state = [], action) => {
    switch (action.type) {
        // Establece los tweets iniciales en el estado de la aplicación
        case 'SET_INITIAL_TWEETS':
            return action.tweets;
        // Agrega un nuevo tweet al estado de la aplicación
        case 'ADD_NEW_TWEET':
            return [...state, action.tweet];
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
