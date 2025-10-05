import { useState, useEffect } from 'react'

interface PolaroidCarouselProps {
  images?: string[]
  captions?: string[]
  autoPlayInterval?: number
}

export default function PolaroidCarousel({
  images = [],
  captions = [],
  autoPlayInterval = 3000,
}: PolaroidCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length)
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [autoPlayInterval, images.length])

  const getStackPosition = (index: number) => {
    const diff = (index - currentIndex + images.length) % images.length

    if (diff === 0) return 'current'
    if (diff === 1) return 'next-1'
    if (diff === 2) return 'next-2'
    return 'hidden'
  }

  const getRotation = (index: number) => {
    const rotations = [2, -3, 4, -2, 3, -4]
    return rotations[index % rotations.length]
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md h-96">
        {/* Stack de polaroids */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((img, index) => {
            const position = getStackPosition(index)
            const rotation = getRotation(index)

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-out ${
                  position === 'current'
                    ? 'z-30 scale-100 opacity-100'
                    : position === 'next-1'
                      ? 'z-20 scale-95 opacity-80 translate-y-2'
                      : position === 'next-2'
                        ? 'z-10 scale-90 opacity-60 translate-y-4'
                        : 'z-0 scale-85 opacity-0 translate-y-8'
                }`}
                style={{
                  transform: `rotate(${position === 'current' ? 0 : rotation}deg) ${
                    position === 'next-1'
                      ? 'translateY(8px)'
                      : position === 'next-2'
                        ? 'translateY(16px)'
                        : ''
                  }`.trim(),
                }}
              >
                {/* Polaroid card */}
                <div className="bg-white p-4 pb-16 shadow-2xl rounded-sm w-64 sm:w-72 md:w-80">
                  <div className="relative">
                    <img
                      src={img}
                      alt={captions[index] || `Photo ${index + 1}`}
                      className="w-full h-64 sm:h-72 md:h-80 object-cover"
                    />
                    {/* Efecto de cinta adhesiva */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/40 rotate-1 shadow-sm" />
                  </div>

                  {/* Caption escrita a mano */}
                  <div className="mt-4 text-center">
                    <p
                      className="font-handwriting text-gray-700 text-lg"
                      style={{ fontFamily: 'cursive' }}
                    >
                      {captions[index] || `Momento ${index + 1}`}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}