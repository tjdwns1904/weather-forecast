import { PlacePayload, WeatherInfo } from "@/types/common";
import { axiosInstance } from "./axios";

const URL = import.meta.env.VITE_API || process.env.API;

export const weatherApi = {
  getWeather: async (url: string, timeUnit: string): Promise<WeatherInfo[]> => {
    const res = await axiosInstance.get(URL + url);
    return timeUnit === "hourly" ? res.data.hourly.data : [{...res.data.current, icon: res.data.current.icon_num}];
  },

  getPlaceID: async (url: string): Promise<PlacePayload> => {
    const res = await axiosInstance.get(URL + url);
    const place = res?.data[0] ? res.data[0] : res.data;
    return place;
  },
};
