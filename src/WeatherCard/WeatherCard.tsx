import React from 'react';
import { WeatherCardProps } from '../Models/Models';

const WeatherCard: React.FC<WeatherCardProps> = ({ type, weather, isCelsius }) => {

    return (
        <div className="card">
            <h2>{type} Weather</h2>
            <img style={{width: '15rem'}} src={`../public/weather_icons/${weather.wx_icon}.svg`} alt={`${weather.wx_icon}`} />
            <p><strong>IATA code:</strong> {weather.location_iata_code}</p>
            <p><strong>Location:</strong> {weather.location}</p>
            <p><strong>{weather.wx_desc}</strong></p>
            <p><strong>Temperature:</strong> {isCelsius ? weather.temp_c : weather.temp_f}°{isCelsius ? 'C' : 'F'}</p>
            <p><strong>Feels Like:</strong> {isCelsius ? weather.feelslike_c : weather.feelslike_f}°{isCelsius ? 'C' : 'F'}</p>
        </div>
    );
};

export default WeatherCard;