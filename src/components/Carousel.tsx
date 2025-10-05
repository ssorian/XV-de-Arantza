import { useState, useEffect } from 'react'

type SlidePosition = 'center' | 'left' | 'right' | 'hidden'

interface CarouselProps {
  autoPlayInterval?: number
  images: string[]
  slideWidth?: string // ej: "w-96" o "w-[500px]"
  slideHeight?: string // ej: "h-72" o "h-[400px]"
}
export function Carousel({
  autoPlayInterval = 4000,
  images,
  slideWidth = 'w-96',
  slideHeight = 'h-72',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const nextSlide = (): void => {
    if (images.length === 0) return
    setCurrentIndex(prev => (prev + 1) % images.length)
  }

  const prevSlide = (): void => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number): void => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlayInterval])

  const getSlidePosition = (index: number): SlidePosition => {
    const diff = index - currentIndex
    if (diff === 0) return 'center'
    if (diff === 1 || diff === -(images.length - 1)) return 'right'
    if (diff === -1 || diff === images.length - 1) return 'left'
    return 'hidden'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[720px] h-96 ">
        {/* Contenedor del carousel */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((img, index) => {
            const position = getSlidePosition(index)

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out cursor-pointer ${slideWidth} ${slideHeight} ${
                  position === 'center'
                    ? 'z-30 scale-100 opacity-100'
                    : position === 'left'
                      ? 'hidden md:block z-20 -translate-x-96 scale-75 opacity-50'
                      : position === 'right'
                        ? 'hidden md:block z-20 translate-x-96 scale-75 opacity-50'
                        : 'opacity-0 scale-50'
                }`}
                onClick={() => position !== 'center' && goToSlide(index)}
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Paginación */}
      <div className="flex gap-3 mt-12">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex ? 'w-12 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="mt-6 text-white/70 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
