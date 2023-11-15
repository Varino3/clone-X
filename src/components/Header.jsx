// components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '../store/actions';

// Foto del usuario
import avatarUser from '../assets/avatar.jpg';

const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Simulación de inicio de sesión
        const mockUser = {
            username: 'manolillo',
            name: 'Manolo García',
            email: 'manolillo@gmail.com',
            avatar: avatarUser
        };
        dispatch(setUser(mockUser));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <h1>X-Clone</h1>
            {user ? (
                <div>
                    <p>Bienvenido, {user.username}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <div>
                    <p>Inicia sesión</p>
                    <button onClick={handleLogin}>Acceder</button>
                </div>
            )}
        </header>
    );
};

export default Header;
