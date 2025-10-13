import { WeatherInfo } from "@/types/common"
import { twJoin } from "tailwind-merge"

export default function HourlyWeather({ weathers }: { weathers: WeatherInfo[] }) {
  return (
    <div className="container w-full max-w-full px-6 md:px-8 py-3 md:py-5 mb-4 md:mb-6 lg:mb-8">
      <h2 className="text-xl md:text-3xl font-semibold">Weather forecast</h2>
      <div className="white-line my-3 md:my-5"></div>
      <div className="flex flex-nowrap overflow-x-scroll">
        {weathers.map((weather: WeatherInfo) => {
          return (
            <ul key={weather.date} className={
              twJoin("list-none text-center px-6", weather.date.slice(11, 16) === "00:00" && "border-l-2 border-l-[#ffffff66]")
            }>
              <li className="my-2.5">{weather.date.slice(11, 16)}</li>
              <li>
                <img src={`/weathers/${weather.icon}.png`} alt={weather.summary} />
              </li>
              <li className="my-2.5">{Math.floor(weather.temperature)}&deg;</li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}