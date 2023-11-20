// actions.jsx

// Establece el usuario actual en el estado de la aplicación.
export const setUser = (user) => ({
    type: 'SET_USER',
    user,
});

// Realiza la acción de cerrar sesión, eliminando la información del usuario del estado.
export const logout = () => ({
    type: 'LOGOUT',
});

// Intenta realizar la acción de inicio de sesión con el nombre de usuario y la contraseña proporcionados.
export const login = (username, password) => ({
    type: 'LOGIN',
    username,
    password,
});

// Agrega un nuevo tweet automáticamente generado por el usuario.
export const addAutoUserTweet = (tweet) => ({
    type: 'ADD_AUTO_USER_TWEET',
    tweet,
});

// Establece los tweets iniciales en el estado de la aplicación, generalmente utilizados al cargar la aplicación por primera vez.
export const setInitialTweets = (tweets) => ({
    type: 'SET_INITIAL_TWEETS',
    tweets,
});

// Agrega un nuevo tweet al estado de la aplicación.
export const addNewTweet = (tweet) => ({
    type: 'ADD_NEW_TWEET',
    tweet,
});
