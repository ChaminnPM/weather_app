import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from '../WeatherCard/WeatherCard';
import { WeatherResponse } from '../Models/Models';

const WeatherServiceCaller: React.FC = () => {
    const [airline, setAirline] = useState<string>('');
    const [flightNum, setFlightNum] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [airlines, setAirlines] = useState<string[]>([]);
    const [flightNums, setFlightNums] = useState<string[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCelsius, setIsCelsius] = useState<boolean>(true);

    useEffect(() => {
        if (airlines.length === 0) {
            const interval = setInterval(() => {
                axios.get('http://localhost:8080/airlines').then((res) => {
                    setAirlines(res.data.airlines);
                }).catch((err) => {
                    console.error(err);
                }
                );
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [airlines]);

    const fetchFlightNums = async (airline: string) => {
        setAirline(airline);
        try {
            const res = await axios.get(`http://localhost:8080/flight_nums?airline=${airline}`);
            setFlightNums(res.data.flight_nums);
        } catch (err) {
            console.error(err);
        }
    }

    const handleButtonClick = async () => {
        setLoading(true);
        setError(null);
        setWeatherData(null);
        try {
            // Fetch with body params
            const res = await axios.post('http://localhost:8080/weather', {
                airline: airline,
                flight_num: flightNum
            });
            setWeatherData(res.data);
        } catch (err) {
            setError('Error fetching data');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <select onChange={(e) => fetchFlightNums(e.target.value)}>
                <option value="">Select an airline</option>
                {airlines.length > 0 && airlines.map((airline) => (
                    <option key={airline} value={airline}>
                        {airline}
                    </option>
                ))}
            </select>
            {airline !== ''  && (
                <select onChange={(e) => setFlightNum(e.target.value)}>
                    <option value="">Select a flight number</option>
                    {flightNums.length > 0 && flightNums.map((flightNum) => (
                        <option key={flightNum} value={flightNum}>
                            {flightNum}
                        </option>
                    ))}
                </select>
            )}
            <button onClick={handleButtonClick} disabled={loading}>
                {loading ? 'Loading...' : 'Search'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {weatherData && (
                <div className='weather-container'>
                    <div className='weather-cards'>
                        <WeatherCard type={'Origin'} weather={weatherData.origin} isCelsius={isCelsius}/>
                        <WeatherCard type={'Destination'} weather={weatherData.destination} isCelsius={isCelsius}/>
                    </div>
                
                    <button onClick={() => setIsCelsius(!isCelsius)}>
                        Switch to °{isCelsius ? "F" : "C"}
                    </button>
                
                </div>
            )}
        </>
    );
};

export default WeatherServiceCaller;