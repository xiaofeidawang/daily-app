import { useState, useEffect } from 'react'
import { getItem, setItem } from '../utils/storage'
import './Settings.css'

function Settings() {
  const [nickname, setNickname] = useState('小可爱')
  const [city, setCity] = useState('')
  const [waterGoal, setWaterGoal] = useState(8)
  const [weatherKey, setWeatherKey] = useState('')
  const [anniversaries, setAnniversaries] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [annName, setAnnName] = useState('')
  const [annDate, setAnnDate] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setNickname(getItem('nickname', '小可爱'))
    setCity(getItem('city', ''))
    setWaterGoal(getItem('waterGoal', 8))
    setWeatherKey(getItem('weatherKey', ''))
    setAnniversaries(getItem('anniversaries', []))
  }, [])

  const save = () => {
    setItem('nickname', nickname)
    setItem('city', city)
    setItem('waterGoal', waterGoal)
    setItem('weatherKey', weatherKey)
    setItem('anniversaries', anniversaries)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addAnniversary = () => {
    setEditId(null)
    setAnnName('')
    setAnnDate('')
    setShowForm(true)
  }

  const editAnniversary = (item) => {
    setEditId(item.id)
    setAnnName(item.name)
    setAnnDate(item.date)
    setShowForm(true)
  }

  const saveAnniversary = () => {
    if (!annName.trim() || !annDate) return
    if (editId) {
      setAnniversaries((prev) =>
        prev.map((a) => (a.id === editId ? { id: a.id, name: annName.trim(), date: annDate } : a))
      )
    } else {
      setAnniversaries((prev) => [...prev, { id: Date.now(), name: annName.trim(), date: annDate }])
    }
    setShowForm(false)
  }

  const deleteAnniversary = (id) => {
    setAnniversaries((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="page settings-page">
      <div className="page-title">⚙️ 设置</div>

      {/* 昵称 */}
      <div className="card settings-card">
        <div className="setting-item">
          <span className="setting-icon">💝</span>
          <div className="setting-info">
            <span className="setting-label">昵称</span>
            <span className="setting-hint">首页问候语会用到哦</span>
          </div>
          <input
            className="setting-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </div>

      {/* 喝水 */}
      <div className="card settings-card">
        <div className="setting-item">
          <span className="setting-icon">💧</span>
          <div className="setting-info">
            <span className="setting-label">每日喝水目标</span>
            <span className="setting-hint">杯数</span>
          </div>
          <div className="setting-stepper">
            <button onClick={() => setWaterGoal((c) => Math.max(1, c - 1))}>−</button>
            <span>{waterGoal}</span>
            <button onClick={() => setWaterGoal((c) => Math.min(20, c + 1))}>+</button>
          </div>
        </div>
      </div>

      {/* 天气 */}
      <div className="card settings-card">
        <div className="setting-item">
          <span className="setting-icon">🌤</span>
          <div className="setting-info">
            <span className="setting-label">城市</span>
            <span className="setting-hint">用于天气查询</span>
          </div>
          <input
            className="setting-input"
            placeholder="如：北京"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="setting-item">
          <span className="setting-icon">🔑</span>
          <div className="setting-info">
            <span className="setting-label">天气 API Key</span>
            <span className="setting-hint">OpenWeatherMap 免费获取</span>
          </div>
          <input
            className="setting-input"
            type="password"
            placeholder="输入 Key..."
            value={weatherKey}
            onChange={(e) => setWeatherKey(e.target.value)}
          />
        </div>
      </div>

      {/* 纪念日 */}
      <div className="card settings-card">
        <div className="setting-section-header">
          <span>🎀 纪念日管理</span>
          <button className="btn btn-small" onClick={addAnniversary}>+ 添加</button>
        </div>
        {anniversaries.length === 0 && (
          <p className="setting-empty">还没有纪念日，添加一个吧～</p>
        )}
        {anniversaries.map((a) => (
          <div key={a.id} className="anniversary-item" onClick={() => editAnniversary(a)}>
            <span className="anniversary-item-name">💗 {a.name}</span>
            <span className="anniversary-item-date">{a.date}</span>
            <button
              className="anniversary-item-del"
              onClick={(e) => { e.stopPropagation(); deleteAnniversary(a.id) }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 保存按钮 */}
      <button className="btn settings-save-btn" onClick={save}>
        {saved ? '✅ 已保存' : '💾 保存设置'}
      </button>

      {showForm && (
        <div className="note-editor-overlay" onClick={() => setShowForm(false)}>
          <div className="note-editor" onClick={(e) => e.stopPropagation()}>
            <div className="editor-header">
              <button className="editor-cancel" onClick={() => setShowForm(false)}>取消</button>
              <span className="editor-label">{editId ? '编辑纪念日' : '添加纪念日'}</span>
              <button className="editor-save" onClick={saveAnniversary}>保存</button>
            </div>
            <div className="period-form">
              <label className="period-form-label">名称</label>
              <input
                className="period-date-input"
                placeholder="如：恋爱纪念日"
                value={annName}
                onChange={(e) => setAnnName(e.target.value)}
              />
              <label className="period-form-label">日期</label>
              <input
                type="date"
                className="period-date-input"
                value={annDate}
                onChange={(e) => setAnnDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
