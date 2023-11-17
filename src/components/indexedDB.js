// indexedDB.js

const dbName = 'miBaseDeDatos';
const dbVersion = 3;

// Función para abrir la base de datos
const openDB = () => {
    return new Promise((resolve, reject) => {
        // Intenta abrir la base de datos
        const request = window.indexedDB.open(dbName, dbVersion);

        // Maneja errores al abrir la base de datos
        request.onerror = (event) => {
            console.error('Error al abrir la base de datos:', event.target.error);
            reject(event.target.error);
        };

        // Maneja éxito al abrir la base de datos
        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        // Maneja la actualización de la base de datos
        request.onupgradeneeded = (event) => {
            console.log('Actualizando la versión de la base de datos...');

            const db = event.target.result;

            // Elimina el almacén de objetos existente antes de crear uno nuevo
            if (db.objectStoreNames.contains('tweets')) {
                db.deleteObjectStore('tweets');
            }

            // Crea un nuevo almacén de objetos 'tweets' con índices
            const tweetStore = db.createObjectStore('tweets', { keyPath: 'id', autoIncrement: true });
            tweetStore.createIndex('userId', 'userId');
            tweetStore.createIndex('text', 'text');
            tweetStore.createIndex('nombre_usuario', 'nombre_usuario');

            // Elimina el almacén de objetos de usuarios antiguo
            if (db.objectStoreNames.contains('usuarios')) {
                db.deleteObjectStore('usuarios');
            }

            // Crea un nuevo almacén de objetos 'usuarios' con índices
            const userStore = db.createObjectStore('usuarios', { keyPath: 'uuid' });
            userStore.createIndex('nombre_usuario', 'nombre_usuario');
        };
    });
};

// Función para añadir un nuevo tweet a la base de datos
const addTweet = (userId, username, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Abre la base de datos
            const db = await openDB();

            // Inicia una transacción de escritura en el almacén de objetos 'tweets'
            const transaction = db.transaction(['tweets'], 'readwrite');

            // Obtiene el almacén de objetos 'tweets' de la transacción
            const tweetStore = transaction.objectStore('tweets');

            // Añade un nuevo tweet al almacén de objetos
            const request = tweetStore.add({ userId, username, text, nombre_usuario: username });

            // Maneja errores al añadir el tweet
            request.onerror = (event) => {
                console.error('Error al agregar el tweet:', event.target.error);
                reject(event.target.error);
            };

            // Maneja éxito al añadir el tweet
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
            // Abre la base de datos
            const db = await openDB();

            // Inicia una transacción de solo lectura en el almacén de objetos 'tweets'
            const transaction = db.transaction(['tweets'], 'readonly');

            // Maneja errores en la transacción
            transaction.onerror = (event) => {
                console.error('Error en la transacción:', event.target.error);
                reject(event.target.error);
            };

            // Obtiene el almacén de objetos 'tweets' de la transacción
            const tweetStore = transaction.objectStore('tweets');

            // Obtiene todos los tweets del almacén de objetos
            const request = tweetStore.getAll();

            // Maneja errores al obtener los tweets
            request.onerror = (event) => {
                console.error('Error al obtener los tweets:', event.target.error);
                reject(event.target.error);
            };

            // Maneja éxito al obtener los tweets
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
    // El objeto Promise representa la eventual finalización o fallo
    // de una operación asincrónica y su valor resultante.
    return new Promise(async (resolve, reject) => {
        try {
            // Abre la base de datos
            const db = await openDB();

            // Inicia una transacción de solo lectura en el almacén de objetos 'usuarios'
            const transaction = db.transaction(['usuarios'], 'readonly');

            // Maneja errores en la transacción
            transaction.onerror = (event) => {
                console.error('Error en la transacción:', event.target.error);
                reject(event.target.error);
            };

            // Obtiene el almacén de objetos 'usuarios' de la transacción
            const userStore = transaction.objectStore('usuarios');

            // Obtiene todos los usuarios del almacén de objetos
            const request = userStore.getAll();

            // Maneja errores al obtener los usuarios
            request.onerror = (event) => {
                console.error('Error al obtener los usuarios:', event.target.error);
                reject(event.target.error);
            };

            // Maneja éxito al obtener los usuarios
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

// Exporta las funciones para su uso en otros archivos
export { addTweet, getAllTweets, getAllUsers };
