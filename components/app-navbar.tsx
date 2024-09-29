'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react';
import { getUserCoins } from '../lib/coinUtils'; // Import utility function

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export function NavbarComponent() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);

      const fetchUserCoins = async () => {
        const userCoins = await getUserCoins(user.id.toString());
        setCoins(userCoins);
      };

      fetchUserCoins();
    }
  }, []);

  return (
    <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{userData?.first_name}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-white">{userData?.first_name || 'lal'}</span>
      </div>
      <div className="bg-yellow-500 px-3 py-1 rounded-full">
        <span className="font-bold text-gray-900">🪙 {coins || 10}</span>
      </div>
    </nav>
  );
}
