import { useState } from 'react'
import './CalendarView.css'

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

function CalendarView({ year, month, moods, anniversaries, onDayClick }) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const cells = []
  for (let i = 0; i < firstDay; i++) {
    cells.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d)
  }

  const getDateStr = (day) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  return (
    <div className="calendar-grid">
      {WEEK_DAYS.map((w) => (
        <div key={w} className="calendar-weekday">{w}</div>
      ))}
      {cells.map((day, i) => {
        if (day === null) {
          return <div key={`empty-${i}`} className="calendar-cell empty" />
        }
        const dateStr = getDateStr(day)
        const mood = moods[dateStr]
        const isAnniversary = anniversaries.some((a) => {
          const d = new Date(a.date)
          return d.getMonth() === month && d.getDate() === day
        })
        const isToday = dateStr === todayStr

        return (
          <div
            key={day}
            className={`calendar-cell ${isToday ? 'today' : ''} ${mood ? 'has-mood' : ''}`}
            onClick={() => onDayClick(dateStr)}
          >
            <span className="calendar-day">{day}</span>
            {mood && <span className="calendar-mood">{mood}</span>}
            {isAnniversary && <span className="calendar-heart">❤️</span>}
          </div>
        )
      })}
    </div>
  )
}

export default CalendarView
