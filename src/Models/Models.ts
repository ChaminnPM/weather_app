import { LocationType } from './Types';

export interface WeatherData {
    temp_c: number;
    temp_f: number;
    wx_desc: string;
    feelslike_c: number;
    feelslike_f: number;
    wx_icon: string;
    location: string;
    location_iata_code: string;
}

export interface WeatherCardProps {
    type: LocationType;
    weather: WeatherData;
    isCelsius: boolean;
}

export interface WeatherResponse {
    origin: WeatherData;
    destination: WeatherData;
}