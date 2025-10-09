import { weatherApi } from "@/api/weatherApi";
import { generateForecastURL, generatePlaceURLByPosition } from "@/utils/urlGenerator";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

interface Coords {
  latitude: number;
  longitude: number;
};

export default function WeatherByLocation() {
  const navigate = useNavigate();
  const [isGPSAllowed, setIsGPSAllowed] = useState(localStorage.getItem('isGPSAllowed') ? Boolean(localStorage.getItem('isGPSAllowed')) : false);
  const [location, setLocation] = useState<Coords | null>(null);

  const { data: place, isLoading: isPlaceLoading } = useQuery({
    queryKey: ['place', location],
    queryFn: () => getPlaceInfo(),
    enabled: !!location
  });

  const { data: weather, isLoading } = useQuery({
    queryKey: ['weather', place?.place_id],
    queryFn: () => getWeather(),
    enabled: isGPSAllowed && !!place?.place_id,
  })

  const getWeather = useCallback(async () => {
    try {
      if (place) {
        const forecastUrl = generateForecastURL({ cityID: place.place_id, unit: "current" });
        const result = await weatherApi.getWeather(forecastUrl, "current");
        return result[0];
      }
    } catch (err) {
      console.log(err);
    }
  }, [place]);

  const getPlaceInfo = async () => {
    if (location) {
      const url = generatePlaceURLByPosition({ lat: location.latitude, lon: location.longitude });
      const data = await weatherApi.getPlaceID(url);
      return data;
    }
  }

  const setPosition = useCallback((position: { coords: Coords; }) => {
    const newLat = position.coords.latitude;
    const newLon = position.coords.longitude;
    setLocation({ latitude: newLat, longitude: newLon });
  }, []);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsGPSAllowed(true);
      localStorage.setItem('isGPSAllowed', JSON.stringify(true));
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  }, [setPosition]);

  useEffect(() => {
    if (isGPSAllowed) {
      getLocation();
    }
  }, [getLocation, isGPSAllowed]);

  return (
    <div className="byLocation-container">
      <h1 className="byLocation text-4xl font-semibold mt-12 mb-8">Your Location</h1>
      {isGPSAllowed ?
        (isPlaceLoading || isLoading) ?
          <div className="loading-spinner mx-auto my-5" />
          :
          (place && weather) &&
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