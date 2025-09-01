import { ChangeEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from 'react-router-dom';
import { PlacePayload, WeatherInfo } from "../types/common";
import { generateForecastURL, generatePlaceURLByPosition } from "../utils/urlGenerator";
import { getWeather } from "../utils/getWeather";
import { useFavorites } from "../hooks/useFavorites";
import { getPlaceID } from "../utils/getPlaceID";

function Home() {
    const navigate = useNavigate();
    const { favorites } = useFavorites();
    const [place, setPlace] = useState<PlacePayload>({ name: "", place_id: "" });
    const [weatherOfFavorites, setWeatherOfFavorites] = useState<WeatherInfo[]>([]);
    const [weather, setWeather] = useState<WeatherInfo>();
    const [isClicked, setIsClicked] = useState(false);
    const [isFavLoading, setIsFavLoading] = useState(false);
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [city, setCity] = useState("");
    const getLocation = () => {
        if (navigator.geolocation) {
            setIsLocationLoading(true);
            navigator.geolocation.getCurrentPosition(setPosition);
        }
    }
    const setPosition = (position: { coords: { latitude: number; longitude: number; }; }) => {
        const newLat = position.coords.latitude;
        const newLon = position.coords.longitude;
        const url = generatePlaceURLByPosition({ lat: newLat, lon: newLon });
        getPlaceInfo(url);
    }
    const getPlaceInfo = async (url: string) => {
        try {
            const data = await getPlaceID(url);
            setPlace(data);
            const forecastUrl = generateForecastURL({ cityID: data.place_id, unit: "current" });
            getWeatherInfos(forecastUrl);
        } catch (err) {
            console.log(err);
        }
    }
    const getWeatherInfos = async (url: string) => {
        try {
            const data = await getWeather(url, "current");
            setWeather({ ...data[0], icon: data[0].icon_num });
            setIsClicked(true);
            localStorage.setItem('isClicked', 'true');
            setIsLocationLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    };
    const getFavorites = async () => {
        try {
            setIsFavLoading(true);
            const promises = favorites.map(async (fav) => {
                const url = generateForecastURL({ cityID: fav, unit: "current" });
                const data = await getWeather(url, "current");
                return { ...data[0], icon: data[0].icon_num };
            });
            const results = await Promise.all(promises);
            results && setWeatherOfFavorites(results);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsFavLoading(false);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCity = e.target.value;
        setCity(newCity);
    }
    useEffect(() => {
        if (localStorage.getItem("isClicked")) {
            setIsClicked(true);
            getLocation();
        }
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
            getFavorites();
        }
    }, [favorites]);
    return (
        <div className="background">
            <Header />
            <div>
                <div>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        navigate({
                            pathname: "/weather", search: createSearchParams({
                                city: city
                            }).toString()
                        });
                    }}>
                        <Form.Group>
                            <Form.Control placeholder="Search..." onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </div>
                <div className="byLocation-container">
                    <h1 className="byLocation">Your Location</h1>
                    {isClicked ?
                        isLocationLoading ?
                            <div className="loading-spinner mx-auto my-5" />
                            :
                            weather &&
                            <div className="location-container" onClick={() => {
                                navigate({
                                    pathname: "/weather", search: createSearchParams({
                                        city: place.name,
                                        place_id: place.place_id,
                                    }).toString()
                                });
                            }}>
                                <h1 className="m-0">{Math.floor(weather.temperature)}&deg;</h1>
                                <p className="mb-0"><span>{place.name}</span><br />{weather.summary}</p>
                                <img src={"src/assets/images/weathers/" + weather.icon + ".png"} alt="" />
                            </div>
                        :
                        <Button className="btn-byLocation" onClick={() => {
                            getLocation();
                        }}>Weather by your location</Button>}
                </div>
                <div>
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
                                    <img src={"src/assets/images/weathers/" + fav.icon + ".png"} alt="" />
                                </div>)}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;