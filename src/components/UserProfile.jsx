// UserProfile.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="user-profile">
      {user ? (
        <div>
          <h2>Mi Perfil</h2>
          <div>
            <img src={user.imagen_perfil} alt="Foto perfil" />
            <div>
              <p><span>Nombre: </span>{user.nombre_usuario}</p>
              <p><span>Correo: </span>{user.email}</p>
              <p><span>Tag: </span>{user.uuid} </p>
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
