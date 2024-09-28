'use client'

import { Home, Users, Wallet } from 'lucide-react'

export function BottomNavComponent({ currentPage, onNavigate }) {
  return (
    <nav className="bg-gray-800 text-white py-2 px-4 flex justify-around items-center">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center ${currentPage === 'home' ? 'text-purple-500' : ''}`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button
        onClick={() => onNavigate('invite')}
        className={`flex flex-col items-center ${currentPage === 'invite' ? 'text-purple-500' : ''}`}
      >
        <Users size={24} />
        <span className="text-xs mt-1">Invite</span>
      </button>
      <button
        onClick={() => onNavigate('wallet')}
        className={`flex flex-col items-center ${currentPage === 'wallet' ? 'text-purple-500' : ''}`}
      >
        <Wallet size={24} />
        <span className="text-xs mt-1">Wallet</span>
      </button>
    </nav>
  )
}