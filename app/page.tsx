'use client'

import { useState, useEffect } from 'react'
import { LandingPageComponent } from '../components/app-landing-page'
import { HomePageComponent } from '../components/app-home-page'
import { InfoPageComponent } from '../components/app-info-page'

type Category = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'home' | 'info'>('landing')
  const [selectedItem, setSelectedItem] = useState<Category | null>(null)

  const navigateTo = (page: 'landing' | 'home' | 'info', item: Category | null = null) => {
    setCurrentPage(page)
    if (item) setSelectedItem(item)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Any code that uses window or browser-specific features goes here
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentPage === 'landing' && <LandingPageComponent onGetStarted={() => navigateTo('home')} />}
      {currentPage === 'home' && <HomePageComponent onItemClick={(item: Category) => navigateTo('info', item)} />}
      {currentPage === 'info' && selectedItem && (
        <InfoPageComponent item={selectedItem} onBack={() => navigateTo('home')} />
      )}
    </div>
  )
}
