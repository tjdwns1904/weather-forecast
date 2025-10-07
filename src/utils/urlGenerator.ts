const key = import.meta.env.VITE_API_KEY || process.env.API_KEY;

export const generateForecastURL = (query: {
  cityID: string;
  unit: string;
}) => {
  const queryURL = "point?place_id=" + query.cityID;
  const timeUnit =
    query.unit === "hourly"
      ? "&sections=hourly&language=en&units=metric&key="
      : "&sections=current&language=en&units=metric&key=";
  const url = queryURL + timeUnit + key;
  return url;
};

export const generatePlaceURLByCName = ({ cName }: { cName: string }) => {
  const queryURL = "find_places?" + "text=" + cName + "&key=";
  const url = queryURL + key;
  return url;
};

export const generatePlaceURLByPosition = ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const queryURL = "nearest_place?lat=" + lat + "&lon=" + lon + "&key=";
  const url = queryURL + key;
  return url;
};
