'use client'

import Navbar from './Navbar'
import { Button } from '@/components/ui/button'

export function WalletPageComponent() {
  const balance = 1000
  const transactions = [
    { id: 1, type: 'Earned', amount: 50, date: '2023-06-01' },
    { id: 2, type: 'Spent', amount: -20, date: '2023-06-02' },
    { id: 3, type: 'Earned', amount: 30, date: '2023-06-03' },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-gray-900">
      <Navbar />
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Your Wallet</h2>
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-gray-300">Current Balance:</p>
          <p className="text-3xl font-bold text-white">{balance} Coins</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Transaction History</h3>
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="bg-gray-800 p-3 rounded-lg text-white flex justify-between">
                <span>{transaction.type}</span>
                <span className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} Coins
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Button className="mt-6 w-full bg-purple-600 hover:bg-purple-700">Earn More Coins</Button>
      </main>
    </div>
  )
}