import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Decorations from './components/Decorations'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Calendar from './pages/Calendar'
import Period from './pages/Period'
import Settings from './pages/Settings'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Decorations />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/period" element={<Period />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
