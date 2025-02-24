import { PlacePayload } from "../types/common";
import { axiosInstance } from "./axios";


export const getPlaceID = async (url: string): Promise<PlacePayload> => {
    const res = await axiosInstance.get(url);
    const place = (res.data && res.data[0]) ? res.data[0] : res.data;
    return place;
}