import { WeatherInfo } from "@/types/common";
import { createSearchParams, useNavigate } from "react-router-dom";

interface Props {
  weather: WeatherInfo;
  city: string;
  place_id: string;
}
export default function WeatherCard({ weather, city, place_id }: Props) {
  const navigate = useNavigate();
  return (
    <div className="weather-card p-4 md:p-6 lg:p-8 mb-4 md:mb-6 lg:mb-8" onClick={() => {
      navigate({
        pathname: "/weather", search: createSearchParams({
          city: city,
          place_id: place_id,
        }).toString()
      });
    }}>
      <h1 className="text-3xl md:text-4xl font-semibold m-0">{Math.floor(weather.temperature)}&deg;</h1>
      <p className="text-sm md:text-lg text-center mb-0">
        <span className="text-lg md:text-xl lg:text-2xl font-bold">
          {city[0].toUpperCase() + city.slice(1)}
        </span>
        <br />
        {weather.summary}
      </p>
      <img src={`/weathers/${weather.icon}.png`} alt={weather.summary} />
    </div>
  )
}