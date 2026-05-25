import { useEffect, useState } from 'react'

export default function Preloader() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`preloader${fadeOut ? ' fade-out' : ''}`} id="preloader">
      <div className="loader-content">
        <i className="fas fa-route loader-icon"></i>
        <h2 className="loader-text">
          Nexus<span className="text-gradient">Dispatch</span>
        </h2>
        <div className="loader-bar"></div>
      </div>
    </div>
  )
}
