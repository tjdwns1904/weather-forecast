import { GeoName } from "@/types/common";
import { axiosInstance } from "./axios";

const USERNAME = import.meta.env.VITE_API_USERNAME || process.env.API_USERNAME;

export const geoNameApi = {
  getGeoName: async (query: string): Promise<GeoName[]> => {
    const { data } = await axiosInstance.get('/geonames/searchJSON', {
      params: {
        name_equals: query,
        username: USERNAME,
      }
    });
    return data.geonames || [];
  } 
}