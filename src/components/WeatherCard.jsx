function WeatherCard() {
  return (
    <div className="card weather-card">
      <div className="weather-header">
        <span className="weather-icon">☀️</span>
        <div>
          <div className="weather-temp">26°</div>
          <div className="weather-desc">晴朗</div>
        </div>
      </div>
      <div className="weather-info">
        <span>城市：请设置</span>
        <span className="weather-badge">🌤 天气</span>
      </div>
    </div>
  )
}

export default WeatherCard
