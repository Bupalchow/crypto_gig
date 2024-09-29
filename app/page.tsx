'use client'

import dynamic from 'next/dynamic';
import { useState } from 'react';

const LandingPageComponent = dynamic(() => import('../components/app-landing-page').then(mod => mod.LandingPageComponent), { ssr: false });
const HomePageComponent = dynamic(() => import('../components/app-home-page').then(mod => mod.HomePageComponent), { ssr: false });
const InfoPageComponent = dynamic(() => import('../components/app-info-page').then(mod => mod.InfoPageComponent), { ssr: false });

type Category = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'home' | 'info'>('landing');
  const [selectedItem, setSelectedItem] = useState<Category | null>(null);

  const navigateTo = (page: 'landing' | 'home' | 'info', item: Category | null = null) => {
    setCurrentPage(page);
    if (item) setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentPage === 'landing' && <LandingPageComponent onGetStarted={() => navigateTo('home')} />}
      {currentPage === 'home' && <HomePageComponent onItemClick={(item: Category) => navigateTo('info', item)} />}
      {currentPage === 'info' && selectedItem && (
        <InfoPageComponent item={selectedItem} onBack={() => navigateTo('home')} />
      )}
    </div>
  );
};

export default App;
