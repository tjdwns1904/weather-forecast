export interface WeatherInfo {
  date: string;
  icon: number;
  temperature: number;
  wind: {
    speed: number;
    angle: number;
  };
  summary: string;
  cloud_cover: {
    total: number;
  };
  icon_num: number;
}

export interface PlacePayload {
  name: string;
  place_id: string;
}

export interface City {
  name: string;
  place_id: string;
}

export interface GeoNamePayload {
  totalResultsCount: number;
  geoNames: GeoName;
}

export interface GeoName {
  name: string;
  lat: number;
  lng: number;
}

export interface ApiError {
  title: string;
  msg: string;
}
