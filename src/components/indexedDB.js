// indexedDB.js

const dbName = 'miBaseDeDatos';
const dbVersion = 3;

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            console.error('Error al abrir la base de datos:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            console.log('Actualizando la versión de la base de datos...');

            const db = event.target.result;

            // Elimina el almacén de objetos existente antes de crear uno nuevo
            if (db.objectStoreNames.contains('tweets')) {
                db.deleteObjectStore('tweets');
            }

            const tweetStore = db.createObjectStore('tweets', { keyPath: 'id', autoIncrement: true });
            tweetStore.createIndex('userId', 'userId');
            tweetStore.createIndex('text', 'text');
            tweetStore.createIndex('nombre_usuario', 'nombre_usuario');

            // Elimina el almacén de objetos de usuarios antiguo
            if (db.objectStoreNames.contains('usuarios')) {
                db.deleteObjectStore('usuarios');
            }

            // Agrega el object store 'usuarios' con la nueva estructura
            const userStore = db.createObjectStore('usuarios', { keyPath: 'uuid' });
            userStore.createIndex('nombre_usuario', 'nombre_usuario');
        };
    });
};

const addTweet = (userId, username, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['tweets'], 'readwrite');
            const tweetStore = transaction.objectStore('tweets');
            const request = tweetStore.add({ userId, username, text, nombre_usuario: username }); // Agrega el campo nombre_usuario

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

const getAllTweets = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['tweets'], 'readonly');

            transaction.onerror = (event) => {
                console.error('Error en la transacción:', event.target.error);
                reject(event.target.error);
            };

            const tweetStore = transaction.objectStore('tweets');
            const request = tweetStore.getAll();

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

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(['usuarios'], 'readonly');

            transaction.onerror = (event) => {
                console.error('Error en la transacción:', event.target.error);
                reject(event.target.error);
            };

            const userStore = transaction.objectStore('usuarios');
            const request = userStore.getAll();

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

export { addTweet, getAllTweets, getAllUsers };
