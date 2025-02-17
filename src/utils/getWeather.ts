import axios from "axios";
import { WeatherInfo } from "../types/common";

export const getWeather = async (url: string, timeUnit: string): Promise<WeatherInfo[]> => {
    const res = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': "*",
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "*"
        }
    });
    return timeUnit === "hourly" ? res.data.hourly.data : [res.data.current];
}