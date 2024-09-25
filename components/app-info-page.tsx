'use client'

import {NavbarComponent} from './app-navbar'
import { Button } from '@/components/ui/button'

type Category = {
  id: string;
  title: string;
  icon: string;
}

export function InfoPageComponent({ item, onBack }: { item: Category | null; onBack: () => void }) {
  if (!item) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavbarComponent />
      <main className="flex-grow p-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-white">{item.title}</h2>
        <div className="text-6xl mb-6">{item.icon}</div>
        <p className="text-center mb-8 text-gray-300">
          This is detailed information about {item.title}. You can add more content here to provide
          comprehensive details about the selected item.
        </p>
        <Button onClick={onBack} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
          Back to Home
        </Button>
      </main>
    </div>
  )
}