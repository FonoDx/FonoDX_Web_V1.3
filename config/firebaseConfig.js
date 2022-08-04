const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env;

/* 
const firebaseConfig = {
    apiKey: "AIzaSyD0u58sSZkhhKnUgxCLGKPHZfDJqSAnEt0",
    authDomain: "fono-dx-dc611.firebaseapp.com",
    databaseURL: "https://fono-dx-dc611-default-rtdb.firebaseio.com",
    projectId: "fono-dx-dc611",
    storageBucket: "fono-dx-dc611.appspot.com",
    messagingSenderId: "693457276149",
    appId: "1:693457276149:web:cd77540770a6ac9f4d49bc",
    measurementId: "G-6J1KKLYGX0"
}

 */
//export { firebaseConfig }

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    }
}