import axios from "axios"
import { PlacePayload } from "../types/common";


export const getPlaceID = async (url: string): Promise<PlacePayload> => {
    const res = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': "*",
            'Access-Control-Allow-Origin': "http://localhost:5173/",
            'Access-Control-Allow-Methods': "*"
        }
    });
    const place = (res.data && res.data[0]) ? res.data[0] : res.data;
    return place;
}