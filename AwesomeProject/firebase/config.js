// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJRKH0FlFYrfcw1OkcFg0qMol0OXVle1k",
  authDomain: "my-awesome-project-16371.firebaseapp.com",
  projectId: "my-awesome-project-16371",
  storageBucket: "my-awesome-project-16371.appspot.com",
  messagingSenderId: "45819338702",
  appId: "1:45819338702:web:8111a0bca67690eb24959f",
  measurementId: "G-6Y4H1SBJWE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
