'use client'

import {NavbarComponent} from './app-navbar'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  { id: '1', title: 'Category 1', icon: '🍎' },
  { id: '2', title: 'Category 2', icon: '🚗' },
  { id: '3', title: 'Category 3', icon: '🏠' },
  { id: '4', title: 'Category 4', icon: '📚' },
  { id: '5', title: 'Category 5', icon: '🎵' },
]

export function HomePageComponent({ onItemClick }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavbarComponent />
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              onClick={() => onItemClick(category)}
              className="flex items-center justify-start space-x-4 h-16 text-left bg-gray-800 hover:bg-gray-700 text-white"
              variant="outline"
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.title}</span>
            </Button>
          ))}
        </div>
      </main>
    </div>
  )
}