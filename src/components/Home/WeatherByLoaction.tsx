import { weatherApi } from "@/api/weatherApi";
import { ApiError } from "@/types/common";
import { generateForecastURL, generatePlaceURLByPosition } from "@/utils/urlGenerator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

interface Coords {
  latitude: number;
  longitude: number;
};

export default function WeatherByLocation() {
  const [isGPSAllowed, setIsGPSAllowed] = useState(localStorage.getItem('isGPSAllowed') ? Boolean(localStorage.getItem('isGPSAllowed')) : false);
  const [location, setLocation] = useState<Coords | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const { data: place, isLoading: isPlaceLoading } = useQuery({
    queryKey: ['place', location],
    queryFn: () => getPlaceInfo(),
    enabled: !!location
  });

  const { data: weather, isLoading } = useQuery({
    queryKey: ['weather', place?.place_id],
    queryFn: () => getWeather(),
    enabled: isGPSAllowed && !!place,
  })

  const getWeather = useCallback(async () => {
    try {
      if (place) {
        const forecastUrl = generateForecastURL({ cityID: place.place_id, unit: "current" });
        const result = await weatherApi.getWeather(forecastUrl, "current");
        return result[0];
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError({ title: 'Result Not Found', msg: `No forecast found for '${place?.name}'` });
        } else if (err.response?.status === 500) {
          setError({ title: 'Server Error', msg: 'An error occurred\nPlease try again later' });
        } else {
          setError({ title: 'Unknown Error', msg: 'An error occurred\nPlease try again later' });
        }
      } else {
        setError({ title: 'Network Error', msg: 'Check your network status and try again' });
      }
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
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold my-4 md:my-8 lg:my-12">Your Location</h1>
      {isGPSAllowed ?
        (isPlaceLoading || isLoading) ?
          <div className="loading-spinner w-[40px] md:w-[60px] lg:w-[80px] aspect-square mx-auto my-5" />
          :
          (place && weather && !error) ?
          <WeatherCard weather={weather} city={place.name} place_id={place.place_id} />
          :
          <div>{error?.title}</div>
        :
        <button className="btn-byLocation mb-4 md:mb-6 lg:mb-8" onClick={() => {
          getLocation();
        }}>
          Weather by your location
        </button>
      }
    </div>
  )
}