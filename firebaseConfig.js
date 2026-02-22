import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB29axtA3Rs-zmdordgsEgAnm1VF3TI4TE",
    authDomain: "hommily.firebaseapp.com",
    databaseURL: "https://hommily-default-rtdb.firebaseio.com",
    projectId: "hommily",
    storageBucket: "hommily.firebasestorage.app",
    messagingSenderId: "755201111078",
    appId: "1:755201111078:web:1e484033a2f069786662e7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };