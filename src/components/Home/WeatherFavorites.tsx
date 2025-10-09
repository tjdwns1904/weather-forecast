import { useFavorites } from "@/hooks/useFavorites";
import { generateForecastURL } from "@/utils/urlGenerator";
import { weatherApi } from "@/api/weatherApi";
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useQueries } from "@tanstack/react-query";

export default function WeatherFavorites() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const weatherQueries = useQueries({
    queries: favorites.map(({ name, place_id }) => ({
      queryKey: ['weather', name],
      queryFn: async () => {
        const url = generateForecastURL({ cityID: place_id, unit: "current" });
        const data = await weatherApi.getWeather(url, "current");
        return data[0];
      }
    })),
  });

  return (
    <>
      <h1 className="text-4xl font-semibold mt-12 mb-8">Your Favorites ({favorites.length}/4)</h1>
      {favorites.length === 0 ?
        <div className="text-center text-white my-12">
          <div className="fav-icon mx-auto opacity-60"></div>
          <h1 className="text-4xl font-semibold mt-12 mb-8">No Favorites Yet!</h1>
          <h2 className="text-2xl font-semibold opacity-60 -mt-8">Locations you mark as favorite will be listed here</h2>
        </div>
        :
        weatherQueries.map((weather, i) => {
          if (weather.isLoading) return <div key={favorites[i].place_id} className="loading-spinner mx-auto my-5" />
          else if (weather.data) {
            return (
              <div key={favorites[i].place_id} className="location-container" onClick={() => {
                const { name, place_id } = favorites[i];
                navigate({
                  pathname: "/weather", search: createSearchParams({
                    city: name,
                    place_id: place_id,
                  }).toString()
                });
              }}>
                <h1 className="text-4xl font-semibold m-0">{Math.floor(weather.data.temperature)}&deg;</h1>
                <p className="text-lg text-center mb-0"><span className="text-2xl font-bold">{favorites[i].name[0].toUpperCase() + favorites[i].name.slice(1)}</span><br />{weather.data.summary}</p>
                <img src={`/weathers/${weather.data.icon}.png`} alt="" />
              </div>
            )
          }
          return <div key={favorites[i].place_id}></div>
        })
      }
    </>
  )
}