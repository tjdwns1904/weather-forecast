import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WeatherInfo } from "../types/common";
import NotFound from "./NotFoundPage";
import generateURL from "../utils/urlGenerator";
import { getWeather } from "../utils/getWeather";
import { useFavorites } from "../hook/useFavorites";

function Weather() {
    const navigate = useNavigate();
    const [city, setCity] = useState("Your Location");
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
        }
    }
    const removeFav = () => {
        removeFavorite(city);
        setIsStarred(false);
    }

    const getWeatherInfos = async (url: string) => {
        try {
            const data = await getWeather(url, "hourly");
            setWeathers(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setExists(false);
        }
    }

    useEffect(() => {
        if (searchParams.get("city")) {
            const cityName = searchParams.get("city");
            cityName && setCity(cityName?.charAt(0).toUpperCase() + cityName?.slice(1));
            const url = generateURL({ position: null, cityID: cityName, unit: "hourly" });
            if (cityName && favorites.includes(cityName.toLowerCase())) {
                setIsStarred(true);
            }
            getWeatherInfos(url);
        } else {
            const lat = Number(searchParams.get("lat"));
            const lon = Number(searchParams.get("lon"));
            const url = generateURL({ position: { lat: lat, lon: lon }, cityID: null, unit: "hourly" });
            getWeatherInfos(url);
        }
    }, []);
    if (!isLoading) {
        return (
            <div className="background">
                <Header />
                <div className="breadcrumb" data-hover="Go back home" onClick={() => navigate('/')}>
                    <p>Home</p>
                </div>

                <div className="heading">
                    {isStarred ? <h1 className="cityName">{city}<div className="filled-star" onClick={() => {
                        removeFav();
                    }}></div></h1> : city === "Your Location" ? <h1 className="cityName">{city}</h1> : <h1 className="cityName">{city}<div className="star" onClick={() => {
                        addFav();
                    }}></div></h1>}

                </div>
                <div className="container">
                    <h2>Weather forecast</h2>
                    <div className="white-line"></div>
                    <div className="weather-container">
                        {weathers.map((weather: WeatherInfo) => {
                            return (
                                <ul key={weather.date} className={weather.date.slice(11, 16) === "00:00" ? "v-line" : ""}>
                                    <li>{weather.date.slice(11, 16)}</li>
                                    <li>
                                        <img src={"src/assets/images/weathers/" + weather.icon + ".png"} alt={weather.summary} />
                                    </li>
                                    <li>{Math.floor(weather.temperature)}&deg;</li>
                                </ul>
                            )
                        }
                        )
                        }
                    </div>
                </div>
                <div className="additional-container">
                    <div className="wind-container">
                        <h2>Wind</h2>
                        <div className="white-line"></div>
                        <div className="wind">
                            <div className="circle">
                                <div>
                                    <h2>{weathers[0].wind.speed}</h2>
                                    <p>m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h2>Additional Conditions</h2>
                        <div className="white-line"></div>
                        <ul className="weather-detail">
                            <li><h3 className="text-tertiary fs-4">Weather</h3></li>
                            <li><h2 className="fs-2">{weathers[0].summary}</h2></li>
                        </ul>
                        <div className="detail-container">
                            <ul className="temp-detail">
                                <li><h3 className="text-tertiary fs-4">Temperature</h3></li>
                                <li><h2 className="fs-2">{weathers[0].temperature}&deg;</h2></li>
                            </ul>
                            <ul className="cloud-detail">
                                <li><h3 className="text-tertiary fs-4">Cloud Cover</h3></li>
                                <li><h2 className="fs-2">{weathers[0].cloud_cover.total}%</h2></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        )
    } else {
        return (
            <div>
                {!exists && <NotFound city={city} />}
                <div className="loading-background" style={{ filter: exists ? "none" : 'blur(2px)' }}>
                    <div className="spinner-container"><div className="loading-spinner"></div></div>
                </div>
            </div>
        )
    }

}

export default Weather;