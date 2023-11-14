// components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '../store/reducers'; // Ajusta la ruta según tu estructura de carpetas

const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Simulación de inicio de sesión
        const mockUser = { username: 'usuario_prueba' };
        dispatch(setUser(mockUser));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <h1>My Twitter Clone</h1>
            {user ? (
                <div>
                    <p>Bienvenido, {user.username}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <div>
                    <p>Inicia sesión</p>
                    <button onClick={handleLogin}>Iniciar Sesión</button>
                </div>
            )}
        </header>
    );
};

export default Header;
