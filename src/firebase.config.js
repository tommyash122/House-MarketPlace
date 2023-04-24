import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDQkhChKiqP4wxWp-VQjUjJnNxWEjr3DPk",
    authDomain: "house-markedplace-app.firebaseapp.com",
    projectId: "house-markedplace-app",
    storageBucket: "house-markedplace-app.appspot.com",
    messagingSenderId: "372206041970",
    appId: "1:372206041970:web:5c85bc5acf5ef01fc6bbeb"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()