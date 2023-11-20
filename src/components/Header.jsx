import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '../store/actions';

const Header = () => {
    // Obtener el estado del usuario y el dispatcher desde Redux
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Estado local para gestionar los datos de inicio de sesión y errores
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        try {
            // Simulación de solicitud a un archivo JSON para obtener datos de usuarios
            const response = await fetch('/users.json');
            const data = await response.json();

            // Simulación de inicio de sesión con los datos proporcionados
            const { username, password } = loginData;
            const authenticatedUser = data.usuarios.find(
                (user) => user.nombre_usuario === username && user.contraseña === password
            );

            // Verificar si el usuario está autenticado y actualizar el estado de Redux
            if (authenticatedUser) {
                dispatch(setUser(authenticatedUser));
            } else {
                // Manejar el caso en que las credenciales no sean válidas
                setLoginError('Datos incorrectos');
            }
        } catch (error) {
            console.error('Error al obtener datos de usuarios', error);
        }
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <h1>X-Clone</h1>
            {user ? (
                // Mostrar información de bienvenida y botón de cierre de sesión si el usuario está autenticado
                <div>
                    <p>Bienvenido, {user.nombre_usuario}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                // Mostrar formulario de inicio de sesión si el usuario no está autenticado
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
