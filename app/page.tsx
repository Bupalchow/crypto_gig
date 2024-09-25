'use client'

import { useState } from 'react'
import { LandingPageComponent } from '../components/app-landing-page'
import { HomePageComponent } from '../components/app-home-page'
import { InfoPageComponent } from '../components/app-info-page'

type Category = {
  id: string;
  title: string;
  icon: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedItem, setSelectedItem] = useState<Category | null>(null)

  const navigateTo = (page: string, item: Category | null = null) => {
    setCurrentPage(page)
    if (item) setSelectedItem(item)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentPage === 'landing' && <LandingPageComponent onGetStarted={() => navigateTo('home')} />}
      {currentPage === 'home' && <HomePageComponent onItemClick={(item: Category) => navigateTo('info', item)} />}
      {currentPage === 'info' && <InfoPageComponent item={selectedItem} onBack={() => navigateTo('home')} />}
    </div>
  )
}