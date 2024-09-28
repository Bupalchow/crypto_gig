import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDJ2tO3DVuH5cqq3ubqofAgWc9Uo9jce4c",
    authDomain: "somethin-feb53.firebaseapp.com",
    databaseURL: "https://somethin-feb53-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "somethin-feb53",
    storageBucket: "somethin-feb53.appspot.com",
    messagingSenderId: "750737411423",
    appId: "1:750737411423:web:06cf2bea51e56dd38afaea",
    measurementId: "G-82411YHQ1Z"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export interface firebaseCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export async function getCategories(): Promise<firebaseCategory[]> {
  const categoriesRef = ref(db, 'categories');
  const snapshot = await get(categoriesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
  }
  return [];
}
