'use client'

import { SetStateAction, useState } from 'react'
import {LandingPageComponent} from '../components/app-landing-page'
import {HomePageComponent} from '../components/app-home-page'
import {InfoPageComponent} from '../components/app-info-page'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedItem, setSelectedItem] = useState(null)

  const navigateTo = (page: SetStateAction<string>, item = null) => {
    setCurrentPage(page)
    if (item) setSelectedItem(item)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentPage === 'landing' && <LandingPageComponent onGetStarted={() => navigateTo('home')} />}
      {currentPage === 'home' && <HomePageComponent onItemClick={(item: null | undefined) => navigateTo('info', item)} />}
      {currentPage === 'info' && <InfoPageComponent item={selectedItem} onBack={() => navigateTo('home')} />}
    </div>
  )
}