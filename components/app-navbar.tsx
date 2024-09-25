'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function NavbarComponent() {
  return (
    <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-white">John Doe</span>
      </div>
      <div className="bg-yellow-500 px-3 py-1 rounded-full">
        <span className="font-bold text-gray-900">🪙 1000</span>
      </div>
    </nav>
  )
}