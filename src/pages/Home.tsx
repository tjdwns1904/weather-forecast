import { ChangeEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { api, api_key } from "../constant";
import { useRef } from "react";
import { WeatherInfo } from "../types/common";

function Home() {
    const navigate = useNavigate();
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        }
    }
    const setPosition = (position: { coords: { latitude: any; longitude: any; }; }) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        getWeather(newLat, newLng);
    }
    const getWeather = async (lat: string, lon: string) => {
        const url = api + "lat=" + lat + "&lon=" + lon + "&sections=current&language=en&units=metric&key=" + api_key;
        await fetch(url, {
            method: "GET",
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
                setWeather(res);
                setIsClicked(true);
                localStorage.setItem('isClicked', 'true');
            })
            .catch(err => console.log(err));
    };
    const getFavs = async (cName: string) => {
        const url = api + "place_id=" + cName + "&sections=current&language=en&units=metric&key=" + api_key;
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
    const myFavorites = useRef<string[]>([]);
    const [favorites, setFavorites] = useState<WeatherInfo[]>([]);
    const [weather, setWeather] = useState<WeatherInfo>();
    const [isClicked, setIsClicked] = useState(false);
    const [city, setCity] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCity = e.target.value;
        setCity(newCity);
    }
    useEffect(() => {
        if (localStorage.getItem("isClicked")) {
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
    console.log(favorites);
    return (
        <div className="background">
            <Header />
            <div>
                <div>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        navigate('/weather', { state: { city: city } });
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
                            const lat = localStorage.getItem("lat");
                            const lon = localStorage.getItem("lon");
                            navigate('/weather', { state: { lat: lat, lon: lon } });
                        }}>
                            <h1>{Math.floor(weather.temperature)}&deg;</h1>
                            <p><span>Your Location</span><br />{weather.detail.summary}</p>
                            <img src={"/pics/weathers/big/" + weather.icon + ".png"} alt="" />
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
                                <p><span>{myFavorites.current[favorites.indexOf(fav)][0].toUpperCase() + myFavorites.current[favorites.indexOf(fav)].slice(1)}</span><br />{fav.detail.summary}</p>
                                <img src={"../assets/images/weathers/" + fav.icon + ".png"} alt="" />
                            </div>)}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;