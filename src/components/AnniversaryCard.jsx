import { useState, useEffect } from 'react'
import { getItem } from '../utils/storage'
import './AnniversaryCard.css'

function AnniversaryCard() {
  const [countdown, setCountdown] = useState({ days: 0, name: '', total: 0 })

  useEffect(() => {
    const items = getItem('anniversaries', [])
    if (items.length === 0) {
      setCountdown({ days: -1, name: '', total: 0 })
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let nearest = null
    let minDiff = Infinity

    items.forEach((item) => {
      const target = new Date(item.date)
      target.setHours(0, 0, 0, 0)

      const thisYear = new Date(today.getFullYear(), target.getMonth(), target.getDate())
      let diff = thisYear - today

      if (diff < 0) {
        const nextYear = new Date(today.getFullYear() + 1, target.getMonth(), target.getDate())
        diff = nextYear - today
      }

      if (diff < minDiff) {
        minDiff = diff
        nearest = { ...item, targetDate: new Date(today.getTime() + diff) }
      }
    })

    if (nearest) {
      const total = Math.ceil((nearest.targetDate - today) / (1000 * 60 * 60 * 24))
      const anniversaryDate = new Date(nearest.date)
      const start = new Date(today.getFullYear(), anniversaryDate.getMonth(), anniversaryDate.getDate())
      if (start < today) {
        start.setFullYear(start.getFullYear() + 1)
      }
      const prevStart = new Date(start)
      prevStart.setFullYear(prevStart.getFullYear() - 1)
      const fullCycle = Math.ceil((start - prevStart) / (1000 * 60 * 60 * 24))
      const elapsed = fullCycle - total
      const progress = Math.round((elapsed / fullCycle) * 100)

      setCountdown({ days: total, name: nearest.name, progress })
    }
  }, [])

  if (countdown.days === -1) {
    return (
      <div className="card anniversary-card">
        <div className="anniversary-empty">
          <span className="anniversary-icon">🎀</span>
          <p>还没有设置纪念日哦～</p>
          <p className="anniversary-hint">去设置页添加吧 💕</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card anniversary-card">
      <div className="anniversary-header">
        <span className="anniversary-heart">💗</span>
        <span className="anniversary-title">{countdown.name}</span>
      </div>
      <div className="anniversary-countdown">
        <span className="countdown-label">距 离</span>
        <div className="countdown-days">
          <span className="countdown-number">{countdown.days}</span>
          <span className="countdown-unit">天</span>
        </div>
      </div>
      <div className="anniversary-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${countdown.progress || 50}%` }}
          />
        </div>
        <span className="progress-text">{countdown.progress || 50}% 已走过</span>
      </div>
    </div>
  )
}

export default AnniversaryCard
