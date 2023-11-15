// components/UserProfile.jsx
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
                        <img src={user.avatar} alt="Avatar usuario" />
                        <div>
                            <p>Nombre: {user.name}</p>
                            <p>Usuario: {user.username}</p>
                            <p>Correo electrónico: {user.email}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Inicie sesión para acceder a todas las funcionalidades</p>
            )}
        </div>
    );
};

export default UserProfile;
