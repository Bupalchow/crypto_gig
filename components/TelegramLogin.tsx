// components/TelegramLogin.tsx
import { useEffect, useState } from 'react';
import { ref, set, get, update } from 'firebase/database'; 
import { db } from '../lib/firebase'; 

interface TelegramUser {
  id: number;
  username: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
  auth_date: string;
}

const TelegramLogin = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Telegram = (window as any).Telegram;
      Telegram.WebApp.ready();

      const telegramUser = Telegram.WebApp.initDataUnsafe.user;
      if (telegramUser) {
        const userInfo: TelegramUser = {
          id: telegramUser.id,
          username: telegramUser.username,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          photo_url: telegramUser.photo_url,
          auth_date: new Date().toISOString(),
        };
        setUser(userInfo);
        saveUserToFirebase(userInfo); 
        fetchUserCoins(userInfo.id);
      }
    }
  }, []);

  // Save the user info to Firebase Realtime Database
  const saveUserToFirebase = async (userInfo: TelegramUser) => {
    try {
      const userRef = ref(db, `users/${userInfo.id}`);
      await set(userRef, {
        username: userInfo.username,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        photo_url: userInfo.photo_url,
        auth_date: userInfo.auth_date,
        coins: 0 
      });
      console.log('User info saved to Firebase Realtime Database');
    } catch (error) {
      console.error('Error saving user info: ', error);
    }
  };

  const fetchUserCoins = async (userId: number) => {
    try {
      const userRef = ref(db, `users/${userId}/coins`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setCoins(snapshot.val());
      } else {
        setCoins(0); 
      }
    } catch (error) {
      console.error('Error fetching coins: ', error);
    }
  };


  const addCoins = async (amount: number) => {
    if (!user) return;
    try {
      const userRef = ref(db, `users/${user.id}/coins`);
      const newCoinBalance = coins + amount;
      await update(userRef, { coins: newCoinBalance });
      setCoins(newCoinBalance);
      console.log('Coins updated!');
    } catch (error) {
      console.error('Error updating coins: ', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.first_name}!</h1>
          <p>Coins: {coins}</p>
          <button onClick={() => addCoins(10)}>Add 10 Coins</button>
        </div>
      ) : (
        <p>Loading Telegram User...</p>
      )}
    </div>
  );
};

export default TelegramLogin;
