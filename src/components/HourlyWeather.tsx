import { WeatherInfo } from "@/types/common"

export default function HourlyWeather({ weathers }: { weathers: WeatherInfo[] }) {
  return (
    <div className="container">
      <h2>Weather forecast</h2>
      <div className="white-line"></div>
      <div className="weather-container">
        {weathers.map((weather: WeatherInfo) => {
          return (
            <ul key={weather.date} className={weather.date.slice(11, 16) === "00:00" ? "v-line" : ""}>
              <li>{weather.date.slice(11, 16)}</li>
              <li>
                <img src={`/weathers/${weather.icon}.png`} alt={weather.summary} />
              </li>
              <li>{Math.floor(weather.temperature)}&deg;</li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}