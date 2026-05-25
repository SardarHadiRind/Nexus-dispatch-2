import { useEffect, useState } from 'react'

const slides = [
  { src: '/assets/hero_truck_neon.png', alt: 'Modern Truck on Highway' },
  { src: '/assets/about_warehouse.png', alt: 'Warehouse Facilities' },
  { src: '/assets/service_load_booking.png', alt: 'Dispatch Operations' },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-img-inner carousel-container">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`carousel-img${i === index ? ' active' : ''}`}
        />
      ))}
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <span key={i} className={`dot${i === index ? ' active' : ''}`}></span>
        ))}
      </div>
    </div>
  )
}
