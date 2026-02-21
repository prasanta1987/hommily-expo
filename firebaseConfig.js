import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB29axtA3Rs-zmdordgsEgAnm1VF3TI4TE",
    authDomain: "hommily.firebaseapp.com",
    databaseURL: "https://hommily-default-rtdb.firebaseio.com",
    projectId: "hommily",
    storageBucket: "hommily.firebasestorage.app",
    messagingSenderId: "755201111078",
    appId: "1:755201111078:web:1e484033a2f069786662e7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
