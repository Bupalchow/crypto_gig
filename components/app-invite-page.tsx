'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function InvitePageComponent() {
  const [inviteLink] = useState('https://myapp.com/invite/user123')
  const [invitedUsers] = useState([
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ])

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-900">
      <Navbar />
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Invite Friends</h2>
        <div className="mb-6">
          <p className="text-gray-300 mb-2">Share your invite link:</p>
          <div className="flex">
            <Input value={inviteLink} readOnly className="bg-gray-800 text-white" />
            <Button onClick={copyInviteLink} className="ml-2 bg-purple-600 hover:bg-purple-700">
              Copy
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Invited Users</h3>
          <ul className="space-y-2">
            {invitedUsers.map((user) => (
              <li key={user.id} className="bg-gray-800 p-3 rounded-lg text-white">
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}