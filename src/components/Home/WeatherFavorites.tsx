import { useEffect, useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { WeatherInfo } from "@/types/common";
import { generateForecastURL } from "@/utils/urlGenerator";
import { weatherApi } from "@/api/weatherApi";
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function WeatherFavorites() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [weatherOfFavorites, setWeatherOfFavorites] = useState<WeatherInfo[]>([]);
  const [isFavLoading, setIsFavLoading] = useState(false);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        setIsFavLoading(true);
        const promises = favorites.map(async (fav) => {
          const url = generateForecastURL({ cityID: fav, unit: "current" });
          const data = await weatherApi.getWeather(url, "current");
          return { ...data[0], icon: data[0].icon_num };
        });
        const results = await Promise.all(promises);
        setWeatherOfFavorites(results);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsFavLoading(false);
      }
    }
    if (favorites.length > 0) {
      getFavorites();
    }
  }, [favorites]);
  
  return (
    <>
      <h1>Your Favorites ({favorites.length}/4)</h1>
      {favorites.length === 0 ?
        <div className="empty-list">
          <div className="fav-icon"></div>
          <h1>No Favorites Yet!</h1>
          <h2>Locations you mark as favorite will be listed here</h2>
        </div>
        :
        isFavLoading ?
          <div className="loading-spinner mx-auto my-5" />
          : weatherOfFavorites.slice(0, favorites.length).map((fav, idx) =>
            fav &&
            <div key={idx} className="location-container" onClick={() => {
              const cityName = favorites[idx];
              navigate({
                pathname: "/weather", search: createSearchParams({
                  city: cityName
                }).toString()
              });
            }}>
              <h1 className="m-0">{Math.floor(fav.temperature)}&deg;</h1>
              <p className="mb-0"><span>{favorites[idx][0].toUpperCase() + favorites[idx].slice(1)}</span><br />{fav.summary}</p>
              <img src={`/weathers/${fav.icon}.png`} alt="" />
            </div>)}
    </>
  )
}