/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WeatherInfo } from "@/types/common";
import NotFound from "../components/Weather/NotFoundPage";
import { generateForecastURL, generatePlaceURLByCName } from "@/utils/urlGenerator";
import { weatherApi } from "@/api/weatherApi";
import { useFavorites } from "@/hooks/useFavorites";
import HourlyWeather from "@/components/Weather/HourlyWeather";
import WeatherDetails from "@/components/Weather/WeatherDetails";
import { twJoin } from "tailwind-merge";

export default function Weather() {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);
  const [weathers, setWeathers] = useState<WeatherInfo[]>([]);
  const [isStarred, setIsStarred] = useState(false);
  const [exists, setExists] = useState(true);
  const addFav = () => {
    if (favorites.length < 4) {
      addFavorite(city);
      setIsStarred(true);
    } else {
      alert("You can have 4 favorites maximum!");
    }
  }
  const removeFav = () => {
    removeFavorite(city);
    setIsStarred(false);
  }

  const getWeatherInfos = async (url: string) => {
    try {
      const data = await weatherApi.getWeather(url, "hourly");
      setWeathers(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setExists(false);
    }
  }
  useEffect(() => {
    const getPlaceInfo = async (url: string) => {
      try {
        const data = await weatherApi.getPlaceID(url);
        setCity(data.name);
        const forecastUrl = generateForecastURL({ cityID: data.place_id, unit: "hourly" });
        getWeatherInfos(forecastUrl);
      } catch (err) {
        console.log(err);
        setExists(false);
      }
    }
    const cityName = searchParams.get("city");
    cityName && setCity(cityName?.charAt(0).toUpperCase() + cityName?.slice(1));
    if (searchParams.get("place_id")) {
      const place_id = searchParams.get("place_id");
      const url = place_id && generateForecastURL({ cityID: place_id, unit: "hourly" });
      url && getWeatherInfos(url);
    } else {
      const url = cityName && generatePlaceURLByCName({ cName: cityName });
      url && getPlaceInfo(url);
    }
    if (cityName && favorites.includes(cityName.toLowerCase())) {
      setIsStarred(true);
    }
  }, [favorites, searchParams]);
  if (!isLoading) {
    return (
      <>
        <div className="breadcrumb" data-hover="Go back home" onClick={() => navigate('/')}>
          <p className="text-2xl font-semibold text-[#e6e4e4ba] pl-6 leading-6">Home</p>
        </div>

        <div className="heading">
          <h1 className="text-4xl font-semibold mt-12 mb-8 flex justify-between items-center">
            {city}
            <div
              className={
                twJoin('opacity-60 cursor-pointer hover:opacity-100', isStarred ? 'filled-star' : 'star')
              }
              onClick={() => {
                isStarred ? removeFav() : addFav();
              }}>
            </div>
          </h1>
        </div>

        {weathers &&
          <>
            <HourlyWeather weathers={weathers} />
            <WeatherDetails weather={weathers[0]} />
          </>
        }

      </>
    )
  } else {
    return (
      <>
        {!exists && <NotFound city={city} />}
        <div className="absolute top-1/2 left-1/2 -translate-1/2"><div className="loading-spinner"></div></div>
      </>
    )
  }

}