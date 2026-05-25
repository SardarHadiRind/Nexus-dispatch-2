import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from './ChatWidget'
import Preloader from './Preloader'

export default function Layout() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.opacity = '0'
    const t = requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.4s ease'
      document.body.style.opacity = '1'
    })
    window.scrollTo(0, 0)
    return () => cancelAnimationFrame(t)
  }, [location.pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      {showPreloader && <Preloader />}
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main key={location.pathname} className="page-main">
        <Outlet context={{ theme }} />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
