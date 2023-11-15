// components/NewsSection.jsx
import React from 'react';

const NewsSection = () => {
    const newsData = [
        {
            id: 1,
            title: 'Nueva función en la aplicación',
            content: 'Hemos lanzado una emocionante función que mejora la experiencia del usuario.',
        },
        {
            id: 2,
            title: 'Evento especial en la comunidad',
            content: 'Participa en nuestro evento virtual para conocer a otros usuarios y compartir tus ideas.',
        },
    ];

    return (
        <div className="news-section">
            <h2>Noticias</h2>
            <ul>
                {newsData.map((news) => (
                    <li key={news.id}>
                        <strong>{news.title}</strong>
                        <p>{news.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsSection;
