// indexedDB.js

// Nombre y versión de la base de datos
const dbName = 'miBaseDeDatos';
const dbVersion = 3;

// Función para abrir la base de datos
const openDB = () => {
    return new Promise((resolve, reject) => {
        // Solicitar la apertura de la base de datos
        const request = window.indexedDB.open(dbName, dbVersion);

        // Manejar errores al abrir la base de datos
        request.onerror = (event) => {
            console.error('Error al abrir la base de datos:', event.target.error);
            reject(event.target.error);
        };

        // Manejar éxito al abrir la base de datos
        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        // Manejar la actualización de la base de datos
        request.onupgradeneeded = (event) => {
            console.log('Actualizando la versión de la base de datos...');

            const db = event.target.result;

            // Elimina el almacén de objetos 'tweets' existente antes de crear uno nuevo
            if (db.objectStoreNames.contains('tweets')) {
                db.deleteObjectStore('tweets');
            }

            // Crea un nuevo almacén de objetos 'tweets' con índices
            const tweetStore = db.createObjectStore('tweets', { keyPath: 'id', autoIncrement: true });
            tweetStore.createIndex('userId', 'userId');
            tweetStore.createIndex('text', 'text');
            tweetStore.createIndex('nombre_usuario', 'nombre_usuario');

            // Elimina el almacén de objetos 'usuarios' existente antes de crear uno nuevo
            if (db.objectStoreNames.contains('usuarios')) {
                db.deleteObjectStore('usuarios');
            }

            // Crea un nuevo almacén de objetos 'usuarios' con índices
            const userStore = db.createObjectStore('usuarios', { keyPath: 'uuid' });
            userStore.createIndex('nombre_usuario', 'nombre_usuario');
        };
    });
};

// Función para agregar un tweet a la base de datos
const addTweet = (userId, username, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['tweets'], 'readwrite');
            const tweetStore = transaction.objectStore('tweets');

            // Agregar el tweet a la base de datos
            const request = tweetStore.add({ userId, username, text, nombre_usuario: username });

            // Manejar errores y éxito al agregar el tweet
            request.onerror = (event) => {
                console.error('Error al agregar el tweet:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                resolve();
            };
        } catch (error) {
            console.error('Error al abrir la base de datos:', error);
            reject(error);
        }
    });
};

// Función para eliminar un tweet de la base de datos
const deleteTweet = (tweetId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['tweets'], 'readwrite');
            const tweetStore = transaction.objectStore('tweets');

            // Eliminar el tweet de la base de datos
            const request = tweetStore.delete(tweetId);

            // Manejar errores y éxito al eliminar el tweet
            request.onerror = (event) => {
                console.error('Error al eliminar el tweet:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                resolve();
            };
        } catch (error) {
            console.error('Error al abrir la base de datos:', error);
            reject(error);
        }
    });
};

// Función para obtener todos los tweets de la base de datos
const getAllTweets = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['tweets'], 'readonly');

            // Manejar errores en la transacción
            transaction.onerror = (event) => {
                console.error('Error en la transacción:', event.target.error);
                reject(event.target.error);
            };

            const tweetStore = transaction.objectStore('tweets');
            const request = tweetStore.getAll();

            // Manejar errores y éxito al obtener los tweets
            request.onerror = (event) => {
                console.error('Error al obtener los tweets:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                const tweets = event.target.result;
                resolve(tweets);
            };
        } catch (error) {
            console.error('Error al abrir la base de datos:', error);
            reject(error);
        }
    });
};

// Función para obtener todos los usuarios de la base de datos
const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['usuarios'], 'readonly');

            // Manejar errores en la transacción
            transaction.onerror = (event) => {
                console.error('Error en la transacción:', event.target.error);
                reject(event.target.error);
            };

            const userStore = transaction.objectStore('usuarios');
            const request = userStore.getAll();

            // Manejar errores y éxito al obtener los usuarios
            request.onerror = (event) => {
                console.error('Error al obtener los usuarios:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                const users = event.target.result;
                resolve(users);
            };
        } catch (error) {
            console.error('Error al abrir la base de datos:', error);
            reject(error);
        }
    });
};

// Exportar las funciones para su uso en otros archivos
export { addTweet, getAllTweets, getAllUsers, deleteTweet };
