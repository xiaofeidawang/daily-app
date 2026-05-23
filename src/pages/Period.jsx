import { useState, useEffect } from 'react'
import { getItem, setItem } from '../utils/storage'
import { predictNext, calcAvgCycle, calcAvgDuration, formatDisplay } from '../utils/periodCalc'
import './Period.css'

function PeriodPage() {
  const [records, setRecords] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [prediction, setPrediction] = useState(null)

  useEffect(() => {
    const saved = getItem('periodRecords', [])
    setRecords(saved)
    if (saved.length > 0) {
      setPrediction(predictNext(saved))
    }
  }, [])

  const saveRecords = (updated) => {
    setRecords(updated)
    setItem('periodRecords', updated)
    setPrediction(predictNext(updated))
  }

  const addRecord = () => {
    setEditingId(null)
    setStartDate('')
    setEndDate('')
    setShowForm(true)
  }

  const editRecord = (record) => {
    setEditingId(record.id)
    setStartDate(record.start)
    setEndDate(record.end || '')
    setShowForm(true)
  }

  const saveRecord = () => {
    if (!startDate) return
    if (editingId) {
      const updated = records.map((r) =>
        r.id === editingId ? { ...r, start: startDate, end: endDate || null } : r
      )
      saveRecords(updated)
    } else {
      saveRecords([...records, { id: Date.now(), start: startDate, end: endDate || null }])
    }
    setShowForm(false)
  }

  const deleteRecord = (id) => {
    saveRecords(records.filter((r) => r.id !== id))
  }

  const getStatus = (record) => {
    if (!record.start) return ''
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = new Date(record.start)
    const end = record.end ? new Date(record.end) : new Date(start)
    if (!record.end) end.setDate(end.getDate() + 4)

    if (start <= today && today <= end) return '当前'
    return ''
  }

  const sortedRecords = [...records].sort((a, b) => new Date(b.start) - new Date(a.start))

  return (
    <div className="page period-page">
      <div className="page-title">👧 生理期记录</div>

      {/* 预测卡片 */}
      {prediction && (
        <div className="card period-predict-card">
          <div className="predict-header">🔮 周期预测</div>
          <div className="predict-stats">
            <div className="predict-stat">
              <span className="stat-value">{prediction.avgCycle}</span>
              <span className="stat-label">天/周期</span>
            </div>
            <div className="predict-stat">
              <span className="stat-value">{prediction.avgDuration}</span>
              <span className="stat-label">天/经期</span>
            </div>
          </div>
          <div className="predict-items">
            <div className="predict-item next">
              <span className="predict-icon">📅</span>
              <div>
                <span className="predict-label">预计下次经期</span>
                <span className="predict-date">{formatDisplay(prediction.nextStart)}</span>
              </div>
            </div>
            <div className="predict-item ovulation">
              <span className="predict-icon">🥚</span>
              <div>
                <span className="predict-label">预计排卵日</span>
                <span className="predict-date">{formatDisplay(prediction.ovulation)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button className="btn period-add-btn" onClick={addRecord}>
        + 记录经期
      </button>

      {records.length === 0 && (
        <div className="period-empty">
          <span className="empty-icon">📋</span>
          <p>还没有记录哦～</p>
          <p className="empty-hint">记录经期可以帮助预测和了解周期 💕</p>
        </div>
      )}

      <div className="period-list">
        {sortedRecords.map((r) => {
          const status = getStatus(r)
          return (
            <div key={r.id} className="card period-card" onClick={() => editRecord(r)}>
              <div className="period-card-header">
                <span className="period-date-range">
                  📅 {formatDisplay(r.start)}
                  {r.end ? ` → ${formatDisplay(r.end)}` : ' (进行中)'}
                </span>
                {status && <span className="badge period-status">{status}</span>}
              </div>
              <div className="period-card-footer">
                <span className="period-duration">
                  持续 {r.end
                    ? Math.round((new Date(r.end) - new Date(r.start)) / (1000 * 60 * 60 * 24)) + 1
                    : '?'} 天
                </span>
                <button
                  className="period-delete"
                  onClick={(e) => { e.stopPropagation(); deleteRecord(r.id) }}
                >
                  🗑
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {showForm && (
        <div className="note-editor-overlay" onClick={() => setShowForm(false)}>
          <div className="note-editor" onClick={(e) => e.stopPropagation()}>
            <div className="editor-header">
              <button className="editor-cancel" onClick={() => setShowForm(false)}>取消</button>
              <span className="editor-label">{editingId ? '编辑记录' : '新建记录'}</span>
              <button className="editor-save" onClick={saveRecord}>保存</button>
            </div>
            <div className="period-form">
              <label className="period-form-label">开始日期</label>
              <input
                type="date"
                className="period-date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label className="period-form-label">结束日期（可选）</label>
              <input
                type="date"
                className="period-date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PeriodPage
