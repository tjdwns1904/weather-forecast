import WeatherFavorites from "@/components/Home/WeatherFavorites";
import WeatherByLocation from "@/components/Home/WeatherByLoaction";
import SearchForm from "@/components/Home/SearchForm";

export default function Home() {
    return (
        <>
            <SearchForm />
            <WeatherByLocation />
            <WeatherFavorites />
        </>
    )
}