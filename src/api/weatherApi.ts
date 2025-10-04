import { PlacePayload, WeatherInfo } from "@/types/common";
import { axiosInstance } from "./axios";

export const weatherApi = {
  getWeather: async (url: string, timeUnit: string): Promise<WeatherInfo[]> => {
    const res = await axiosInstance.get(url);
    return timeUnit === "hourly" ? res.data.hourly.data : [res.data.current];
  },

  getPlaceID: async (url: string): Promise<PlacePayload> => {
    const res = await axiosInstance.get(url);
    const place = res?.data[0] ? res.data[0] : res.data;
    return place;
  },
};
