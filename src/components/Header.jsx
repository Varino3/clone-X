// components/Header.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '../store/actions';

const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/users.json');
            const data = await response.json();

            // Simulación de inicio de sesión
            const { username, password } = loginData;
            const authenticatedUser = data.usuarios.find(
                (user) => user.nombre_usuario === username && user.contraseña === password
            );

            if (authenticatedUser) {
                dispatch(setUser(authenticatedUser));
            } else {
                setLoginError('Datos incorrectas');
            }
        } catch (error) {
            console.error('Error al obtener datos de usuarios', error);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <h1>X-Clone</h1>
            {user ? (
                <div>
                    <p>Bienvenido, {user.nombre_usuario}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <div>
                    <p>Inicia sesión</p>
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <button onClick={handleLogin}>Acceder</button>
                    </div>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </div>
            )}
        </header>
    );
};

export default Header;
