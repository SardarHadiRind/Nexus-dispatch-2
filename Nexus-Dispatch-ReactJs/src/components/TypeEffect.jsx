import { useEffect, useRef, useState } from 'react'

const words = ['Hassle.', 'Paperwork.', 'Stress.']

export default function TypeEffect() {
  const [text, setText] = useState('')
  const state = useRef({ wordIndex: 0, charIndex: 0, isDeleting: false })
  const timeoutRef = useRef(null)

  useEffect(() => {
    const type = () => {
      const { wordIndex, charIndex, isDeleting } = state.current
      const currentWord = words[wordIndex]
      let delay = 150

      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1))
        state.current.charIndex = charIndex - 1
        delay = 50
      } else {
        setText(currentWord.substring(0, charIndex + 1))
        state.current.charIndex = charIndex + 1
      }

      if (!isDeleting && state.current.charIndex === currentWord.length) {
        state.current.isDeleting = true
        delay = 2000
      } else if (isDeleting && state.current.charIndex === 0) {
        state.current.isDeleting = false
        state.current.wordIndex = (wordIndex + 1) % words.length
        delay = 500
      }

      timeoutRef.current = setTimeout(type, delay)
    }

    timeoutRef.current = setTimeout(type, 1000)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return <span className="text-gradient type-effect">{text}</span>
}
