import { useEffect, useState } from 'react'
import './Decorations.css'

const elements = ['🌸', '💕', '✨', '🎀', '⭐', '💖', '🩷', '🌷']

function Decorations() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: elements[i % elements.length],
      left: Math.random() * 90 + 5,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 12 + Math.random() * 16,
    }))
    setItems(generated)
  }, [])

  return (
    <div className="decorations">
      {items.map((item) => (
        <span
          key={item.id}
          className="float-item"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}px`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  )
}

export default Decorations
