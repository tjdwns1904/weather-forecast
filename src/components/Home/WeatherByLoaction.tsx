import { weatherApi } from "@/api/weatherApi";
import { PlacePayload, WeatherInfo } from "@/types/common";
import { generateForecastURL, generatePlaceURLByPosition } from "@/utils/urlGenerator";
import { useCallback, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function WeatherByLocation() {
  const navigate = useNavigate();
  const [place, setPlace] = useState<PlacePayload>({ name: "", place_id: "" });
  const [weather, setWeather] = useState<WeatherInfo>();
  const [isClicked, setIsClicked] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const getPlaceInfo = useCallback(async (url: string) => {
    try {
      const data = await weatherApi.getPlaceID(url);
      setPlace(data);
      const forecastUrl = generateForecastURL({ cityID: data.place_id, unit: "current" });
      getWeatherInfos(forecastUrl);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const setPosition = useCallback((position: { coords: { latitude: number; longitude: number; }; }) => {
    const newLat = position.coords.latitude;
    const newLon = position.coords.longitude;
    const url = generatePlaceURLByPosition({ lat: newLat, lon: newLon });
    getPlaceInfo(url);
  }, [getPlaceInfo]);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  }, [setPosition]);

  const getWeatherInfos = async (url: string) => {
    try {
      const data = await weatherApi.getWeather(url, "current");
      setWeather({ ...data[0], icon: data[0].icon_num });
      setIsClicked(true);
      localStorage.setItem('isClicked', 'true');
      setIsLocationLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isClicked")) {
      setIsClicked(true);
      getLocation();
    }
  }, [getLocation]);
  return (
    <div className="byLocation-container">
      <h1 className="byLocation text-4xl font-semibold mt-12 mb-8">Your Location</h1>
      {isClicked ?
        isLocationLoading ?
          <div className="loading-spinner mx-auto my-5" />
          :
          weather &&
          <div className="location-container" onClick={() => {
            navigate({
              pathname: "/weather", search: createSearchParams({
                city: place.name,
                place_id: place.place_id,
              }).toString()
            });
          }}>
            <h1 className="text-4xl font-semibold m-0">{Math.floor(weather.temperature)}&deg;</h1>
            <p className="text-lg text-center mb-0"><span className="text-2xl font-bold">{place.name}</span><br />{weather.summary}</p>
            <img src={`/weathers/${weather.icon}.png`} alt="" />
          </div>
        :
        <button className="btn-byLocation" onClick={() => {
          getLocation();
        }}>
          Weather by your location
        </button>
      }
    </div>
  )
}