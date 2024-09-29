'use client'

import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { NavbarComponent } from './app-navbar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { getUserCoins, decrementCoins } from '../lib/coinUtils'

const SUPPORTED_CHAINS = ['Ethereum', 'Arbitrum', 'TON']

export function RedeemPageComponent() {
  const [selectedChain, setSelectedChain] = useState('')
  const [coinsToRedeem, setCoinsToRedeem] = useState('')
  const [userCoins, setUserCoins] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserCoins = async () => {
    setIsLoading(true)
    try {
      const userId = WebApp.initDataUnsafe?.user?.id.toString() || 'unknown'
      const coins = await getUserCoins(userId)
      setUserCoins(coins)
    } catch (error) {
      console.error('Error fetching user coins:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserCoins()
  }, [])

  const handleRedeem = async () => {
    if (!selectedChain || !coinsToRedeem) {
      alert('Please select a chain and enter the number of coins to redeem.')
      return
    }

    const redeemAmount = parseInt(coinsToRedeem)
    if (isNaN(redeemAmount) || redeemAmount <= 0) {
      alert('Please enter a valid number of coins to redeem.')
      return
    }

    if (redeemAmount > userCoins) {
      alert('You don\'t have enough coins to redeem.')
      return
    }

    console.log(`Redeeming ${redeemAmount} coins on ${selectedChain}`)
    
    const userId = WebApp.initDataUnsafe?.user?.id.toString() || 'unknown'
    const newBalance = await decrementCoins(userId, redeemAmount)
    setUserCoins(newBalance)
    
    // Reset the form
    setCoinsToRedeem('')
    setSelectedChain('')
    alert(`Successfully redeemed ${redeemAmount} coins on ${selectedChain}. New balance: ${newBalance} coins.`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavbarComponent />
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Redeem Rewards</h2>
        <div className="mb-4 flex justify-between items-center">
          <p className="text-white">
            {isLoading ? 'Loading...' : `Available Coins: ${userCoins}`}
          </p>
          <Button onClick={fetchUserCoins} disabled={isLoading}>
            Refresh Balance
          </Button>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Select Chain:</label>
          <select 
            className="bg-gray-700 text-white p-2 rounded w-full"
            onChange={(e) => setSelectedChain(e.target.value)}
            value={selectedChain}
          >
            <option value="">Select a chain</option>
            {SUPPORTED_CHAINS.map(chain => (
              <option key={chain} value={chain}>{chain}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Coins to Redeem:</label>
          <Input
            type="number"
            value={coinsToRedeem}
            onChange={(e) => setCoinsToRedeem(e.target.value)}
            placeholder="Enter number of coins"
            className="bg-gray-700 text-white"
          />
        </div>
        <Button 
          onClick={handleRedeem}
          disabled={!selectedChain || !coinsToRedeem || isLoading}
          className="w-full"
        >
          Redeem {coinsToRedeem} coins on {selectedChain || 'selected chain'}
        </Button>
      </main>
    </div>
  )
}
