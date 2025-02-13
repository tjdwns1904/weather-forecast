import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { api_key, api } from '../constant';
import { WeatherInfo } from "../types/common";
import NotFound from "./NotFoundPage";

function Weather() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const newCity = useRef("Your Location");
    const myFavorites = useRef<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [weathers, setWeathers] = useState<WeatherInfo[]>([]);
    const [isStarred, setIsStarred] = useState(false);
    const [exists, setExists] = useState(true);
    const addFav = () => {
        if (myFavorites.current.length < 4) {
            myFavorites.current.push(newCity.current.toLowerCase());
            localStorage.setItem("favorites", JSON.stringify(myFavorites.current));
            setIsStarred(true);
        }
    }
    const removeFav = () => {
        const newFav = myFavorites.current.filter(fav => {
            return fav !== newCity.current.toLowerCase();
        });
        localStorage.setItem("favorites", JSON.stringify(newFav));
        setIsStarred(false);
    }
    useEffect(() => {
        const getWeathers = async (url: string) => {
            await fetch(url, {
                method: "Get",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': "*",
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods': "*"
                }
            })
                .then(res => res.json())
                .then(res => {
                    setWeathers(res.hourly.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setExists(false);
                });
        }
        if (state.city) {
            const city = state.city;
            newCity.current = city.charAt(0).toUpperCase() + city.slice(1);
            const url = api + "place_id=" + city + "&sections=hourly&language=en&units=metric&key=" + api_key;
            getWeathers(url);
        } else {
            const lat = state.lat;
            const lon = state.lon;
            const url = api + "lat=" + lat + "&lon=" + lon + "&sections=hourly&language=en&units=metric&key=" + api_key;
            getWeathers(url);
        }
        myFavorites.current = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites") || "") : [];
        if (myFavorites.current.includes(newCity.current.toLowerCase())) {
            setIsStarred(true);
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
                    {isStarred ? <h1 className="cityName">{newCity.current}<div className="filled-star" onClick={() => {
                        removeFav();
                    }}></div></h1> : newCity.current === "Your Location" ? <h1 className="cityName">{newCity.current}</h1> : <h1 className="cityName">{newCity.current}<div className="star" onClick={() => {
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
                                    <li >
                                        <img src={"/pics/weathers/big/" + weather.icon + ".png"} alt="/pics/weathers/big/1.png" />
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
                                <h2>{weathers[0].detail.wind.speed}</h2>
                                <p>m/s</p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h2>Additional Conditions</h2>
                        <div className="white-line"></div>
                        <ul className="weather-detail">
                            <li><h2>Weather</h2></li>
                            <li><h1>{weathers[0].detail.summary}</h1></li>
                        </ul>
                        <div className="detail-container">
                            <ul className="temp-detail">
                                <li><h2>Temperature</h2></li>
                                <li><h1>{weathers[0].detail.temperature}&deg;</h1></li>
                            </ul>
                            <ul className="cloud-detail">
                                <li><h2>Cloud Cover</h2></li>
                                <li><h1>{weathers[0].detail.cloud_cover.total}%</h1></li>
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
                {!exists && <NotFound city={newCity.current} />}
                <div className="loading-background" style={{ filter: exists ? "none" : 'blur(2px)' }}>
                    <div className="spinner-container"><div className="loading-spinner"></div></div>
                </div>
            </div>
        )
    }

}

export default Weather;