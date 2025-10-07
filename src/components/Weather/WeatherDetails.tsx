import { WeatherInfo } from "@/types/common";
import Compass from "./Compass";

export default function WeatherDetails({ weather }: { weather: WeatherInfo }) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col container w-full max-w-full">
        <div className="flex-1">
          <h2>Wind</h2>
          <div className="white-line"></div>
        </div>
        <Compass speed={weather.wind.speed} deg={weather.wind.angle} />
      </div>
      <div className="container w-full max-w-full">
        <h2 className="font-bold">Additional Conditions</h2>
        <div className="white-line"></div>
        <div className="my-5">
          <h3 className="text-tertiary fs-4">Weather</h3>
          <h2 className="fs-2">{weather.summary}</h2>
        </div>
        <div className="mb-5">
          <h3 className="text-tertiary fs-4">Temperature</h3>
          <h2 className="fs-2">{weather.temperature}&deg;</h2>
        </div>
        <div className="mb-5">
          <h3 className="text-tertiary fs-4">Cloud Cover</h3>
          <h2 className="fs-2">{weather.cloud_cover.total}%</h2>
        </div>
      </div>
    </div>
  )
}