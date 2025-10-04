import { WeatherInfo } from "@/types/common";

export default function WeatherDetails({ weather }: { weather: WeatherInfo }) {
  return (
    <div className="additional-container">
      <div className="container me-5">
        <h2>Wind</h2>
        <div className="white-line"></div>
        <div className="wind">
          <div className="circle">
            <div>
              <h2 className="mb-3">{weather.wind.speed}</h2>
              <p>m/s</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Additional Conditions</h2>
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