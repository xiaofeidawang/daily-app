import { getItem } from '../utils/storage'
import DailyQuote from '../components/DailyQuote'
import AnniversaryCard from '../components/AnniversaryCard'
import WeatherCard from '../components/WeatherCard'
import WaterTracker from '../components/WaterTracker'
import './Home.css'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 6) return '夜深了'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  return '晚上好'
}

function getDateString() {
  const d = new Date()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weekDays[d.getDay()]}`
}

function Home() {
  const greeting = getGreeting()
  const dateStr = getDateString()
  const nickname = getItem('nickname', '小可爱')

  return (
    <div className="page home-page">
      <div className="home-header">
        <p className="home-date">{dateStr}</p>
        <h1 className="home-greeting">
          {greeting}，{nickname}
          <span className="greeting-wave">👋</span>
        </h1>
      </div>

      <DailyQuote />
      <AnniversaryCard />
      <div className="home-cat">🐱</div>
      <WeatherCard />
      <WaterTracker />
    </div>
  )
}

export default Home
