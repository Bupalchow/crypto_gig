'use client'

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { HomeIcon, GiftIcon } from '@heroicons/react/24/solid';

const LandingPageComponent = dynamic(() => import('../components/app-landing-page').then(mod => mod.LandingPageComponent), { ssr: false });
const HomePageComponent = dynamic(() => import('../components/app-home-page').then(mod => mod.HomePageComponent), { ssr: false });
const InfoPageComponent = dynamic(() => import('../components/app-info-page').then(mod => mod.InfoPageComponent), { ssr: false });
const RedeemPageComponent = dynamic(() => import('../components/app-redeem-page').then(mod => mod.RedeemPageComponent), { ssr: false });

type Category = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'home' | 'info' | 'redeem'>('landing');
  const [selectedItem, setSelectedItem] = useState<Category | null>(null);

  const navigateTo = (page: 'landing' | 'home' | 'info' | 'redeem', item: Category | null = null) => {
    setCurrentPage(page);
    if (item) setSelectedItem(item);
  };

  const renderBottomNav = () => {
    if (currentPage === 'landing') return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around items-center h-16">
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center ${currentPage === 'home' ? 'text-blue-500' : 'text-gray-400'}`}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => navigateTo('redeem')}
          className={`flex flex-col items-center ${currentPage === 'redeem' ? 'text-blue-500' : 'text-gray-400'}`}
        >
          <GiftIcon className="h-6 w-6" />
          <span className="text-xs">Redeem</span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      {currentPage === 'landing' && <LandingPageComponent onGetStarted={() => navigateTo('home')} />}
      {currentPage === 'home' && <HomePageComponent onItemClick={(item: Category) => navigateTo('info', item)} />}
      {currentPage === 'info' && selectedItem && (
        <InfoPageComponent item={selectedItem} onBack={() => navigateTo('home')} />
      )}
      {currentPage === 'redeem' && <RedeemPageComponent />}
      {renderBottomNav()}
    </div>
  );
};

export default App;
