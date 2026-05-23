import { useState, useEffect } from 'react'
import { getItem, setItem } from '../utils/storage'
import './Notes.css'

function Notes() {
  const [notes, setNotes] = useState([])
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [swipedId, setSwipedId] = useState(null)

  useEffect(() => {
    setNotes(getItem('notes', []))
  }, [])

  const saveNotes = (updated) => {
    setNotes(updated)
    setItem('notes', updated)
  }

  const addNote = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
    setShowEditor(true)
  }

  const editNote = (note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
    setShowEditor(true)
  }

  const saveNote = () => {
    if (!title.trim() && !content.trim()) return
    const now = new Date().toISOString()
    if (editingId) {
      const updated = notes.map((n) =>
        n.id === editingId ? { ...n, title: title.trim(), content: content.trim(), updatedAt: now } : n
      )
      saveNotes(updated)
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        createdAt: now,
        updatedAt: now,
      }
      saveNotes([newNote, ...notes])
    }
    setShowEditor(false)
  }

  const deleteNote = (id) => {
    saveNotes(notes.filter((n) => n.id !== id))
    setSwipedId(null)
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const colors = ['#FFF0F5', '#FFF5F7', '#FFF0FA', '#FFF5F0', '#FDF0FF', '#FFF8F0']

  return (
    <div className="page notes-page">
      <div className="page-title">
        📝 我的记事本
        <span className="notes-count">{notes.length} 条</span>
      </div>

      <button className="btn add-note-btn" onClick={addNote}>
        + 写笔记
      </button>

      {notes.length === 0 && (
        <div className="notes-empty">
          <span className="empty-icon">📖</span>
          <p>还没有笔记哦～</p>
          <p className="empty-hint">点击上方按钮写下第一条吧 💕</p>
        </div>
      )}

      <div className="notes-list">
        {notes.map((note, i) => (
          <div
            key={note.id}
            className="note-card-wrapper"
            onTouchStart={() => setSwipedId(note.id)}
            onMouseEnter={() => setSwipedId(note.id)}
            onMouseLeave={() => setSwipedId(null)}
          >
            <div
              className="card note-card"
              style={{ background: colors[i % colors.length] }}
              onClick={() => editNote(note)}
            >
              <h3 className="note-title">{note.title || '无标题'}</h3>
              <p className="note-content">{note.content}</p>
              <span className="note-date">{formatDate(note.updatedAt)}</span>
            </div>
            <button
              className={`note-delete-btn ${swipedId === note.id ? 'show' : ''}`}
              onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {showEditor && (
        <div className="note-editor-overlay" onClick={() => setShowEditor(false)}>
          <div className="note-editor" onClick={(e) => e.stopPropagation()}>
            <div className="editor-header">
              <button className="editor-cancel" onClick={() => setShowEditor(false)}>取消</button>
              <span className="editor-label">{editingId ? '编辑笔记' : '新建笔记'}</span>
              <button className="editor-save" onClick={saveNote}>保存</button>
            </div>
            <input
              className="editor-title"
              placeholder="标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <textarea
              className="editor-content"
              placeholder="写下你想记录的..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Notes
