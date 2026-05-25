import { useState, useRef, useEffect } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi there! How can we help you maximize your miles today?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { type: 'user', text }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Thanks for reaching out! A senior dispatcher will be with you in just a moment.',
        },
      ])
    }, 1500)
  }

  return (
    <>
      <div className={`chat-widget${open ? ' active' : ''}`} id="chat-widget">
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="status-dot"></div>
            <strong>Live Support</strong>
          </div>
          <button
            type="button"
            id="close-chat"
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            onClick={() => setOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="chat-messages" id="chat-messages" ref={messagesRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.text}
            </div>
          ))}
          {typing && (
            <div className="message bot-message typing-indicator">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          )}
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            id="chat-input"
            placeholder="Type a message..."
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button type="button" id="send-chat" onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="chat-toggle-btn"
        id="chat-toggle-btn"
        onClick={() => setOpen((o) => !o)}
      >
        <i className="fas fa-comment-dots"></i>
      </button>
    </>
  )
}
