import { WeatherInfo } from "@/types/common";
import Compass from "./Compass";

export default function WeatherDetails({ weather }: { weather: WeatherInfo }) {
  return (
    <div className="md:flex gap-2">
      <div className="flex flex-col container w-full max-w-full px-8 py-5 mb-4 md:mb-6 lg:mb-8">
        <div className="flex-1">
          <h2 className="text-xl md:text-3xl font-semibold">Wind</h2>
          <div className="white-line my-3 md:my-5"></div>
        </div>
        <Compass speed={weather.wind.speed} deg={weather.wind.angle} />
      </div>
      <div className="container w-full max-w-full px-8 py-5 mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-xl md:text-3xl font-semibold">Additional Conditions</h2>
        <div className="white-line my-3 md:my-5"></div>
        <div className="my-5">
          <h3 className="text-gray-300 text-xl md:text-2xl">Weather</h3>
          <h2 className="text-2xl md:text-3xl">{weather.summary}</h2>
        </div>
        <div className="mb-5">
          <h3 className="text-gray-300 text-xl md:text-2xl">Temperature</h3>
          <h2 className="text-2xl md:text-3xl">{weather.temperature}&deg;</h2>
        </div>
        <div className="mb-5">
          <h3 className="text-gray-300 text-xl md:text-2xl">Cloud Cover</h3>
          <h2 className="text-2xl md:text-3xl">{weather.cloud_cover.total}%</h2>
        </div>
      </div>
    </div>
  )
}