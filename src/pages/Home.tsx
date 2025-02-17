import { ChangeEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { WeatherInfo } from "../types/common";
import generateURL from "../utils/urlGenerator";
import { getWeather } from "../utils/getWeather";

function Home() {
    const navigate = useNavigate();
    const myFavorites = useRef<string[]>([]);
    const [favorites, setFavorites] = useState<WeatherInfo[]>([]);
    const [weather, setWeather] = useState<WeatherInfo>();
    const [isClicked, setIsClicked] = useState(false);
    const [city, setCity] = useState("");
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        }
    }
    const setPosition = (position: { coords: { latitude: number; longitude: number; }; }) => {
        const newLat = position.coords.latitude;
        const newLon = position.coords.longitude;
        const url = generateURL({ position: { lat: newLat, lon: newLon }, cityID: null, unit: "current" });
        localStorage.setItem("position", JSON.stringify({ lat: newLat, lon: newLon }));
        getWeatherInfos(url);
    }
    const getPosition = () => {
        return JSON.parse(localStorage.getItem("position") || "{ lat: null, lon: null }");
    }
    const getWeatherInfos = async (url: string) => {
        try {
            const data = await getWeather(url, "current");
            setWeather({ ...data[0], icon: data[0].icon_num });
            setIsClicked(true);
            localStorage.setItem('isClicked', 'true');
        }
        catch (err) {
            console.log(err);
        }
    };
    const getFavs = async (cName: string) => {
        const url = generateURL({ position: null, cityID: cName, unit: "current" });
        await fetch(url, {
            method: "Get",
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json",
                'Access-Control-Allow-Headers': "*",
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Methods': "*"
            }
        })
            .then(res => res.json())
            .then(res => {
                setFavorites(prev => [
                    ...prev,
                    res
                ])
            })
            .catch(err => console.log(err));
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
        if (localStorage.getItem("favorites")) {
            myFavorites.current = JSON.parse(localStorage.getItem("favorites") || "");
        }
        if (myFavorites.current.length > 0) {
            myFavorites.current.map(fav => {
                getFavs(fav);
            })
        }
    }, []);
    return (
        <div className="background">
            <Header />
            <div>
                <div>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        navigate({pathname: "/weather", search: createSearchParams({
                            city: city
                        }).toString() });
                    }}>
                        <Form.Group>
                            <Form.Control placeholder="Search..." onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </div>
                <div className="byLocation-container">
                    <h1 className="byLocation">Your Location</h1>
                    {isClicked && weather ?
                        <div className="location-container" onClick={() => {
                            const { lat, lon } = getPosition();
                            navigate('/weather', { state: { lat: lat, lon: lon } });
                        }}>
                            <h1>{Math.floor(weather.temperature)}&deg;</h1>
                            <p><span>Your Location</span><br />{weather.summary}</p>
                            <img src={"src/assets/images/weathers/" + weather.icon + ".png"} alt="" />
                        </div> : <Button className="btn-byLocation" onClick={() => {
                            getLocation();
                        }}>Weather by your location</Button>}
                </div>
                <div>
                    <h1>Your Favorites ({myFavorites.current.length}/4)</h1>
                    {myFavorites.current.length === 0 ?
                        <div className="empty-list">
                            <div className="fav-icon"></div>
                            <h1>No Favorites Yet!</h1>
                            <h2>Locations you mark as favorite are shown here</h2>
                        </div>
                        :
                        favorites.slice(0, myFavorites.current.length).map(fav =>
                            <div key={myFavorites.current[favorites.indexOf(fav)]} className="location-container" onClick={() => {
                                const cityName = myFavorites.current[favorites.indexOf(fav)];
                                navigate('/weather', { state: { city: cityName } });
                            }}>
                                <h1>{Math.floor(fav.temperature)}&deg;</h1>
                                <p><span>{myFavorites.current[favorites.indexOf(fav)][0].toUpperCase() + myFavorites.current[favorites.indexOf(fav)].slice(1)}</span><br />{fav.summary}</p>
                                <img src={"../assets/images/weathers/" + fav.icon + ".png"} alt="" />
                            </div>)}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;