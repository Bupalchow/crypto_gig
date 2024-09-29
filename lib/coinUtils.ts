import { db } from './firebase';
import { ref, get, update } from 'firebase/database';

export const incrementCoins = async (userId: string, amount: number) => {
  const userRef = ref(db, `users/${userId}/coins`);

  
  try {
    userCoins[userId] = (userCoins[userId] || 10) + amount;
    
    const snapshot = await get(userRef);
    let currentCoins = snapshot.exists() ? snapshot.val() : 0;
    
    const newCoins = currentCoins + amount;
    await update(ref(db, `users/${userId}`), { coins: newCoins });

    return newCoins;
  } catch (error) {
    console.error('Error incrementing coins:', error);
    return 10;
  }
};

export async function getUserCoins(userId: string): Promise<number> {
  try {
    const response = await fetch(`/api/coins/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user coins')
    }
    const data = await response.json()
    return data.coins
  } catch (error) {
    console.error('Error fetching user coins:', error)
    throw error
  }
}
let userCoins: { [userId: string]: number } = {};

export const decrementCoins = async (userId: string, amount: number): Promise<number> => {
  userCoins[userId] = Math.max((userCoins[userId] || 10) - amount, 0);
  return userCoins[userId];
};