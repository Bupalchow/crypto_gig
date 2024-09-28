'use client'

import { useEffect, useState } from 'react'
import { NavbarComponent } from './app-navbar'
import { Button } from '@/components/ui/button'
import { firebaseCategory, getCategories } from '@/lib/firebase'


export function HomePageComponent({ onItemClick }: { onItemClick: (item: firebaseCategory) => void }) {
  const [categories, setCategories] = useState<firebaseCategory[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
    }
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavbarComponent />
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => onItemClick(category)}
              className="flex items-center justify-start space-x-4 h-16 text-left bg-gray-800 hover:bg-gray-700 text-white"
              variant="outline"
            >
              <img src={category.imageUrl} alt={category.title} width={40} height={40} className="rounded-full" />
              <span>{category.title}</span>
            </Button>
          ))}
        </div>
      </main>
    </div>
  )
}