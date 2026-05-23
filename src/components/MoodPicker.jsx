import './MoodPicker.css'

const moods = [
  { emoji: '😊', label: '开心' },
  { emoji: '🥰', label: '幸福' },
  { emoji: '😌', label: '平静' },
  { emoji: '😴', label: '困困' },
  { emoji: '😢', label: '难过' },
  { emoji: '😰', label: '焦虑' },
  { emoji: '😡', label: '生气' },
  { emoji: '🤒', label: '不舒服' },
]

function MoodPicker({ dateStr, currentMood, onSelect, onClose }) {
  return (
    <div className="mood-overlay" onClick={onClose}>
      <div className="mood-picker" onClick={(e) => e.stopPropagation()}>
        <div className="mood-header">
          <span className="mood-date">📅 {dateStr}</span>
          <button className="mood-close" onClick={onClose}>✕</button>
        </div>
        <p className="mood-question">今天心情怎么样？</p>
        <div className="mood-grid">
          {moods.map((m) => (
            <button
              key={m.emoji}
              className={`mood-btn ${currentMood === m.emoji ? 'selected' : ''}`}
              onClick={() => onSelect(m.emoji)}
            >
              <span className="mood-emoji">{m.emoji}</span>
              <span className="mood-label">{m.label}</span>
            </button>
          ))}
        </div>
        {currentMood && (
          <button className="mood-clear" onClick={() => onSelect(null)}>
            清除心情
          </button>
        )}
      </div>
    </div>
  )
}

export default MoodPicker
