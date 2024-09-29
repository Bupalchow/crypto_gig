
import { db } from './firebase';
import { ref, get, update } from 'firebase/database';

export const incrementCoins = async (userId: string, amount: number) => {
  const userRef = ref(db, `users/${userId}/coins`);
  
  try {
    const snapshot = await get(userRef);
    let currentCoins = snapshot.exists() ? snapshot.val() : 0;
    
    const newCoins = currentCoins + amount;
    await update(ref(db, `users/${userId}`), { coins: newCoins });
    return newCoins;
  } catch (error) {
    console.error('Error incrementing coins:', error);
    return null;
  }
};

export const getUserCoins = async (userId: string) => {
  const userRef = ref(db, `users/${userId}/coins`);
  const snapshot = await get(userRef);
  return snapshot.exists() ? snapshot.val() : 0;
};
