import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '../store/actions';

const Header = () => {
  // Obtener el estado del usuario desde Redux
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Almacenar datos de inicio de sesión
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const [loginError, setLoginError] = useState('');

  // Cargar datos del usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  // Inicio de sesión
  const handleLogin = async () => {
    try {
      // Simular la obtención de datos de usuarios desde una fuente externa (puede ser una API real)
      const response = await fetch('/users.json');
      const data = await response.json();

      const { username, password } = loginData;

      // Buscar al usuario autenticado en los datos obtenidos
      const authenticatedUser = data.usuarios.find(
        (user) => user.nombre_usuario === username && user.contraseña === password
      );

      if (authenticatedUser) {
        // Actualizar el estado de Redux con la información del usuario autenticado
        dispatch(setUser(authenticatedUser));
        // Guardar la información del usuario en localStorage para mantener la sesión
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
      } else {
        setLoginError('Datos incorrectos');
      }
    } catch (error) {
      console.error('Error al obtener datos de usuarios', error);
    }
  };

  // Cierre de sesión
  const handleLogout = () => {
    // Limpiar la información del usuario en localStorage
    localStorage.removeItem('user');

    dispatch(logout());
  };

  return (
    <header>
      <h1>X-Clone</h1>
      {user ? (
        // Mostrar información de bienvenida y botón de cierre de sesión
        <div>
          <p>Bienvenido, {user.nombre_usuario}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        // Mostrar formulario de inicio de sesión si el usuario no está autenticado
        <div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Usuario"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <button onClick={handleLogin}>Acceder</button>
          </div>
          {/* Mostrar mensaje de error si hay un problema durante el inicio de sesión */}
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </div>
      )}
    </header>
  );
};

export default Header;
