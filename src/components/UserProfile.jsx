// UserProfile.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="user-profile">
      {user ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <div>
            <img src={user.imagen_perfil} alt="Foto usuario" />
            <div>
              <p>Nombre: {user.nombre_usuario}</p>
              <p>Correo: {user.email}</p>
              <span> {user.uuid} </span>
            </div>
          </div>
        </div>
      ) : (
        <p>Inicie sesión para poder acceder a todas las funcionalidades</p>
      )}
    </div>
  );
};

export default UserProfile;
