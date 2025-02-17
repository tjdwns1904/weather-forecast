export interface WeatherInfo {
    date: string;
    icon: number;
    temperature: number; 
    wind: {
        speed: number
    };
    summary: string;
    cloud_cover: {
        total: number
    };
    icon_num: number;
}