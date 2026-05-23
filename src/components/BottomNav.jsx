import { NavLink } from 'react-router-dom'
import './BottomNav.css'

function BottomNav() {
  const tabs = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/notes', label: '记事', icon: '📝' },
    { path: '/calendar', label: '日历', icon: '📅' },
    { path: '/period', label: '生理', icon: '👧' },
    { path: '/settings', label: '设置', icon: '⚙️' },
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) =>
            `nav-tab ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
