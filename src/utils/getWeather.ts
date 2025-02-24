import { WeatherInfo } from "../types/common";
import { axiosInstance } from "./axios";

export const getWeather = async (url: string, timeUnit: string): Promise<WeatherInfo[]> => {
    const res = await axiosInstance.get(url);
    return timeUnit === "hourly" ? res.data.hourly.data : [res.data.current];
}