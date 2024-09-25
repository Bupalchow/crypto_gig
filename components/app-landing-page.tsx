'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'

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

export function LandingPageComponent({ onGetStarted }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [particlesInit, setParticlesInit] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tutorialSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const particlesLoaded = async (container) => {
    await console.log(container)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#111827",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
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