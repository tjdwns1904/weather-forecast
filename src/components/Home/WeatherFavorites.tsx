import { useFavorites } from "@/hooks/useFavorites";
import { generateForecastURL } from "@/utils/urlGenerator";
import { weatherApi } from "@/api/weatherApi";
import { useQueries } from "@tanstack/react-query";
import WeatherCard from "./WeatherCard";

export default function WeatherFavorites() {
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
      <h1 className="text-3xl md:text-4xl font-semibold my-4 md:my-8 lg:my-12">Your Favorites ({favorites.length}/4)</h1>
      {favorites.length === 0 ?
        <div className="text-center text-white my-6 md:my-8 lg:my-12">
          <div className="fav-icon mx-auto opacity-60"></div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-12 mb-8">No Favorites Yet!</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold opacity-60 -mt-8">Locations you mark as favorite will be listed here</h2>
        </div>
        :
        weatherQueries.map((weather, i) => {
          if (weather.isLoading) return <div key={favorites[i].place_id} className="loading-spinner w-[40px] md:w-[60px] lg:w-[80px] mx-auto my-5" />
          else if (weather.data) {
            return (
              <WeatherCard key={favorites[i].place_id} weather={weather.data} city={favorites[i].name} place_id={favorites[i].place_id}/>
            )
          }
          return <div key={favorites[i].place_id}></div>
        })
      }
    </>
  )
}