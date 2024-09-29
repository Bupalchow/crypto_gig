'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { DotPattern } from './magicui/dot-pattern'

const tutorialSlides = [
  {
    title: 'Crypto Gig',
    description: 'New way to make money online',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/cryptocurrency-wallet-5432053-4533151.png'
  },
  {
    title: 'Air Drops',
    description: 'Get the list of hot and trending Airdrops',
    image: 'https://www.cryptomining.com.pl/wp-content/uploads/2019/12/Airdrop-cryptomining.png'
  },
  {
    title: 'Earn real cash',
    description: 'Earn real cash by participating in those Airdrops  ',
    image: 'https://i.pinimg.com/originals/9e/3d/b6/9e3db62b64ec5c7881e711bf294427dd.jpg'
  },
  {
    title: 'Earn Coins',
    description: 'Even earn coins for participating in those Airdrop events',
    image: 'https://laborx.com/static/images/landing/benefits/crypto-payments-banner.png'
  },
  {
    title: 'Redeem to real cash',
    description: 'Once we are on mainnet get real value ',
    image: 'https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-earning-and-making-money-in-internet-concept-png-image_6567933.png'
  }
]

interface LandingPageComponentProps {
  onGetStarted: () => void;
}

export function LandingPageComponent({ onGetStarted }: LandingPageComponentProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tutorialSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <DotPattern
        width={32}
        height={32}
        cx={1}
        cy={1}
        cr={1}
        className="absolute inset-0 h-full w-full text-foreground/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />
      <div className="text-center max-w-md z-10">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Crypto Gig</h1>
        <p className="text-xl text-gray-300 mb-8">Never miss the opportunity to make money</p>
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-white mb-2">Quick Tutorial:</h2>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img
              src={tutorialSlides[currentSlide].image}
              alt={tutorialSlides[currentSlide].title}
              className="w-32 h-32 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-white">{tutorialSlides[currentSlide].title}</h3>
            <p className="text-sm text-gray-300">{tutorialSlides[currentSlide].description}</p>
          </motion.div>
        </div>
        <Button onClick={onGetStarted} className="bg-purple-600 text-white hover:bg-purple-700">
         Start Earning
        </Button>
      </div>
    </div>
  )
}