// auth.js

// Obtiene la información del usuario del archivo users.json
export const getUserInfo = async (username) => {
    try {
        const response = await fetch(`/users.json`);
        const users = await response.json();
        const user = users.find((user) => user.nombre_usuario === username);
        return user || null;
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        return null;
    }
};

// Guarda el token de autenticación en el almacenamiento local
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        return { token }; // Devolver un objeto con el token
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return { error };
    }
};

// Verificación de autenticación
export const isAuthenticated = () => {
    const { token, error } = getAuthToken();

    if (error) {
        console.error('Error en isAuthenticated:', error);
        return false;
    }

    return !!token;
};