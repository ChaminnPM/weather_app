import WeatherServiceCaller from "./WeatherServiceCaller/WeatherServiceCaller";
import "./App.css";

function App() {
  return (
    <>
      <h1>Weather Service</h1>
      <p>Enter your flight number to check the weather</p>
      <WeatherServiceCaller />
    </>
  );
}

export default App;
