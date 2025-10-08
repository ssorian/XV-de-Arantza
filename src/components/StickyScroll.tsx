import React, { useState, useEffect } from 'react'

export default function StickyScrollComponent() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [phraseOpacity, setPhraseOpacity] = useState(1)
  const [blurAmount, setBlurAmount] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)

  const phrases = [
    'Nuestra historia comienza',
    'Un amor para siempre',
    'Te invitamos a ser testigo',
  ]

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const totalScrollableHeight = windowHeight * 2
      const scrollY = window.scrollY
      const progress = Math.min(1, scrollY / totalScrollableHeight)
      setScrollProgress(progress)

      // Ocultar hint de scroll cuando se empiece a hacer scroll
      if (scrollY > 10) {
        setShowScrollHint(false)
      } else {
        setShowScrollHint(true)
      }

      const phaseProgress = progress * 3
      const phaseIndex = Math.floor(phaseProgress)
      const withinPhaseProgress = phaseProgress - phaseIndex

      if (phaseIndex !== currentPhrase && phaseIndex < phrases.length) {
        setCurrentPhrase(phaseIndex)
      }

      if (withinPhaseProgress < 0.15) {
        const fadeIn = withinPhaseProgress / 0.15
        setPhraseOpacity(fadeIn)
        setBlurAmount(10 - fadeIn * 10)
      } else if (withinPhaseProgress > 0.85) {
        const fadeOut = (withinPhaseProgress - 0.85) / 0.15
        setPhraseOpacity(1 - fadeOut)
        setBlurAmount(fadeOut * 10)
      } else {
        setPhraseOpacity(1)
        setBlurAmount(0)
      }

      if (progress > 0.9) {
        const finalFade = (progress - 0.9) / 0.1
        setPhraseOpacity(Math.max(0, 1 - finalFade))
        setBlurAmount(finalFade * 20)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPhrase, phrases.length])

  return (
    <div className="relative bg-black">
      {/* Componente Sticky con frases */}
      <div
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-20"
        style={{
          opacity: phraseOpacity,
          filter: `blur(${blurAmount}px)`,
          transition: 'filter 0.1s ease-out',
        }}
      >
        <div className="text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold text-rose-400 font-great-vibes">
            {phrases[currentPhrase]}
          </h2>
        </div>
      </div>

      {/* Indicador de scroll - aparece al inicio */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 pointer-events-none transition-opacity duration-300 ${
          showScrollHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-white text-2xl font-josefin md:text-3xl font-light tracking-wide">
          Desliza hacia abajo
        </p>
        <svg
          className="w-12 h-12 md:w-16 md:h-16 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Contenido para hacer scroll - sin paginación visible */}
      <div className="relative z-10">
        <section className="h-screen bg-black" />
        <section className="h-screen bg-black" />
        <section className="h-screen bg-black" />
      </div>
    </div>
  )
}
