import { useState, useEffect } from 'react'
import CalendarView from '../components/CalendarView'
import MoodPicker from '../components/MoodPicker'
import { getItem, setItem } from '../utils/storage'
import './Calendar.css'

function CalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [moods, setMoods] = useState({})
  const [selectedDate, setSelectedDate] = useState(null)
  const [anniversaries, setAnniversaries] = useState([])

  useEffect(() => {
    setMoods(getItem('moods', {}))
    setAnniversaries(getItem('anniversaries', []))
  }, [])

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  const selectMood = (emoji) => {
    if (!selectedDate) return
    const updated = { ...moods }
    if (emoji === null) {
      delete updated[selectedDate]
    } else {
      updated[selectedDate] = emoji
    }
    setMoods(updated)
    setItem('moods', updated)
    setSelectedDate(null)
  }

  const currentMood = selectedDate ? moods[selectedDate] : null

  return (
    <div className="page calendar-page">
      <div className="page-title">📅 日历</div>

      <div className="calendar-nav">
        <button className="calendar-nav-btn" onClick={prevMonth}>‹</button>
        <span className="calendar-month">{year}年{month + 1}月</span>
        <button className="calendar-nav-btn" onClick={nextMonth}>›</button>
      </div>

      <div className="card calendar-card">
        <CalendarView
          year={year}
          month={month}
          moods={moods}
          anniversaries={anniversaries}
          onDayClick={setSelectedDate}
        />
      </div>

      <div className="mood-legend">
        <span className="legend-label">心情图例：</span>
        <span>😊开心</span><span>🥰幸福</span><span>😌平静</span>
        <span>😴困困</span><span>😢难过</span><span>😰焦虑</span>
      </div>

      {selectedDate && (
        <MoodPicker
          dateStr={selectedDate}
          currentMood={currentMood}
          onSelect={selectMood}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}

export default CalendarPage
