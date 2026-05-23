import { useState, useEffect } from 'react'
import quotes from '../data/quotes.json'
import './DailyQuote.css'

function DailyQuote() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('quote-index'), 10)
    if (!isNaN(saved) && saved < quotes.length) {
      setIndex(saved)
    } else {
      const random = Math.floor(Math.random() * quotes.length)
      setIndex(random)
    }
  }, [])

  const prev = () => {
    setIndex((i) => {
      const next = i === 0 ? quotes.length - 1 : i - 1
      localStorage.setItem('quote-index', next)
      return next
    })
  }

  const next = () => {
    setIndex((i) => {
      const next = i === quotes.length - 1 ? 0 : i + 1
      localStorage.setItem('quote-index', next)
      return next
    })
  }

  return (
    <div className="card daily-quote">
      <div className="quote-header">
        <span className="quote-label">今日暖心 💌</span>
      </div>
      <div className="quote-body">
        <button className="quote-arrow" onClick={prev}>‹</button>
        <p className="quote-text" key={index}>{quotes[index]}</p>
        <button className="quote-arrow" onClick={next}>›</button>
      </div>
      <div className="quote-dots">
        {quotes.slice(0, 8).map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index % 8 ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default DailyQuote
