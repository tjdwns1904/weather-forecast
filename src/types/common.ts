export interface WeatherInfo {
    date: string;
    icon: number;
    temperature: number;
    detail: WeatherDetail;
}

interface WeatherDetail {
    wind: {
        speed: number
    };
    summary: string;
    temperature: number;
    cloud_cover: {
        total: number
    };
}