'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { DotPattern } from './magicui/dot-pattern'

const tutorialSlides = [
  {
    title: 'Browse Categories',
    description: 'Explore various categories on the home page',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    title: 'View Details',
    description: 'Click on a category to see more information',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    title: 'Earn Coins',
    description: 'Interact with the app to earn coins',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    title: 'Check Balance',
    description: 'View your coin balance in the top navbar',
    image: '/placeholder.svg?height=200&width=200'
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
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to MyApp</h1>
        <p className="text-xl text-gray-300 mb-8">Discover amazing content</p>
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
          Get Started
        </Button>
      </div>
    </div>
  )
}