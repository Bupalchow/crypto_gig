'use client'

import {NavbarComponent} from './app-navbar'
import { Button } from '@/components/ui/button'
import { firebaseCategory } from '@/lib/firebase'


export function InfoPageComponent({ item, onBack }: { item: firebaseCategory | null; onBack: () => void }) {
  if (!item) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavbarComponent />
      <main className="flex-grow p-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-white">{item.title}</h2>
        <img src={item.imageUrl} alt={item.title} width={120} height={120} className="rounded-full mb-6" />
        <p className="text-center mb-8 text-gray-300">
          {item.description}
        </p>
        <div className="flex space-x-4">
          <Button onClick={onBack} className="bg-purple-600 hover:bg-purple-700 text-white">
            Back to Home
          </Button>
          <Button onClick={() => window.open(item.link, '_blank')} className="bg-blue-600 hover:bg-blue-700 text-white">
            Start Earning
          </Button>
        </div>
      </main>
    </div>
  )
}