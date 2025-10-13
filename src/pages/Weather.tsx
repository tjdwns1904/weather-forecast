/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotFound from "../components/Weather/NotFoundPage";
import { generateForecastURL, generatePlaceURLByCName } from "@/utils/urlGenerator";
import { weatherApi } from "@/api/weatherApi";
import { useFavorites } from "@/hooks/useFavorites";
import HourlyWeather from "@/components/Weather/HourlyWeather";
import WeatherDetails from "@/components/Weather/WeatherDetails";
import { twJoin } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiError } from "@/types/common";

export default function Weather() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get("city")!;
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { data: city, isLoading: isCityLoading } = useQuery({
    queryKey: ['city', cityName.toLowerCase()],
    queryFn: () => getPlaceInfo(),
    enabled: !!cityName
  });
  const { data: weathers, isLoading: isForecastLoading } = useQuery({
    queryKey: ['weather-forecast', city?.place_id],
    queryFn: () => getWeatherInfos(),
    enabled: !!city
  });
  const [isStarred, setIsStarred] = useState(cityName ? favorites.some((c) => c.name === cityName.toLowerCase()) : false);
  const [error, setError] = useState<ApiError | null>(null);

  const addFav = () => {
    if (city && favorites.length < 4) {
      addFavorite(city);
      setIsStarred(true);
    } else {
      alert("You can have 4 favorites maximum!");
    }
  }

  const removeFav = () => {
    if (city) {
      removeFavorite(city.name);
      setIsStarred(false);
    }
  }

  const getWeatherInfos = async () => {
    try {
      if (city) {
        const url = generateForecastURL({ cityID: city.place_id, unit: 'hourly' })
        const data = await weatherApi.getWeather(url, "hourly");
        return data;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError({title: 'Result Not Found', msg: `No forecast found for '${city?.name || cityName}'`});
        } else if (err.response?.status === 500) {
          setError({title: 'Server Error', msg: 'An error occurred\nPlease try again later'});
        } else {
          setError({title: 'Unknown Error', msg: 'An error occurred\nPlease try again later'});
        }
      } else {
        setError({title: 'Network Error', msg: 'Check your network status and try again'});
      }
    }
  }

  const getPlaceInfo = async () => {
    try {
      const url = generatePlaceURLByCName({ cName: cityName! });
      const data = await weatherApi.getPlaceID(url);
      const { name, place_id } = data;
      return { name, place_id };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError({title: 'City Not Found', msg: `No city named '${city?.name || cityName}'`});
        } else if (err.response?.status === 500) {
          setError({title: 'Server Error', msg: 'An error occurred\nPlease try again later'});
        } else {
          setError({title: 'Unknown Error', msg: 'An error occurred\nPlease try again later'});
        }
      } else {
        setError({title: 'Network Error', msg: 'Check your network status and try again'});
      }
    }
  }

  if (!isCityLoading && !isForecastLoading) {
    return (
      (weathers && city && !error) ?
        <>
          <div className="breadcrumb" data-hover="Go back home" onClick={() => navigate('/')}>
            <p className="text-2xl font-semibold text-[#e6e4e4ba] pl-6 leading-6">Home</p>
          </div>
          <div className="heading">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-8 md:mt-12 mb-4 md:mb-6 lg:mb-8 flex justify-between items-center">
              {city.name}
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
          <>
            <HourlyWeather weathers={weathers} />
            <WeatherDetails weather={weathers[0]} />
          </>
        </>
        :
        <NotFound error={error!} />
    )
  } else {
    return (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-1/2"><div className="loading-spinner"></div></div>
      </>
    )
  }

}