import { useState, useEffect } from 'react'
import { getItem, setItem, getTodayKey } from '../utils/storage'
import './WaterTracker.css'

function WaterTracker() {
  const goal = getItem('waterGoal', 8)
  const todayKey = getTodayKey()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const saved = getItem('waterData', {})
    setCurrent(saved[todayKey] || 0)
  }, [todayKey])

  const addCup = () => {
    if (current >= goal) return
    const next = current + 1
    setCurrent(next)
    const saved = getItem('waterData', {})
    saved[todayKey] = next
    setItem('waterData', saved)
  }

  const progress = Math.min((current / goal) * 100, 100)
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="card water-card">
      <div className="water-header">
        <span className="water-label">💧 今日喝水</span>
        <span className="water-count">{current}/{goal} 杯</span>
      </div>
      <div className="water-body">
        <div className="water-ring-container">
          <svg className="water-ring" viewBox="0 0 120 120">
            <circle
              className="ring-bg"
              cx="60" cy="60" r="54"
              fill="none"
              stroke="#FFF0F5"
              strokeWidth="8"
            />
            <circle
              className="ring-fill"
              cx="60" cy="60" r="54"
              fill="none"
              stroke="url(#waterGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
            />
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFB6C1" />
                <stop offset="100%" stopColor="#FF69B4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="ring-text">
            <span className="ring-percent">{Math.round(progress)}%</span>
          </div>
        </div>
        <button className="btn water-btn" onClick={addCup}>
          {current >= goal ? '🎉 目标达成！' : '+ 喝一杯'}
        </button>
      </div>
    </div>
  )
}

export default WaterTracker
