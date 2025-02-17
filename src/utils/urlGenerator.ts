const baseURL = import.meta.env.VITE_API;
const key = import.meta.env.VITE_API_KEY;

const generateURL = (query: {
    position: { lat: number, lon: number } | null,
    cityID: string | null,
    unit: string
}) => {
    const queryURL = query.cityID ? "place_id=" + query.cityID : "lat=" + query.position?.lat + "&lon=" + query.position?.lon;
    const timeUnit = query.unit === "hourly" ? "&sections=hourly&language=en&units=metric&key=" : "&sections=current&language=en&units=metric&key=";
    const url = baseURL + queryURL + timeUnit + key;
    return url;
}

export default generateURL;
