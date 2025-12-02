import React, { useState } from "react";
import axios from "axios";
import "./WeatherAppStyle.css";
import { toast } from "react-toastify";

const BaseUrl = import.meta.env.VITE_BaseUrl;

const WeatherApp = () => {
  const [weather, setWeather] = useState({
    city: "",
    data: null,
    loading: false,
  });

  const fetchWeatherData = async (e) => {
    e.preventDefault();

    if (!weather.city.trim()) {
      toast.error("Please enter a city name.");
      return;
    }

    try {
      setWeather((prev) => ({ ...prev, loading: true }));

      const response = await axios.get(
        `${BaseUrl}/weather?city=${weather.city}`
      );

      setWeather((prev) => ({
        ...prev,
        data: response.data.data,
        loading: false,
      }));

      // toast.success("Weather data fetched successfully!");
    } catch (error) {
      console.error(error);
      setWeather((prev) => ({ ...prev, loading: false }));
      toast.error(
        error?.response?.data?.message || "Failed to fetch weather data"
      );
    }
  };

  return (
    <div className="app_container">
      <div className="app_wrapper">
        <h1>How's the sky looking today?</h1>

        <form onSubmit={fetchWeatherData}>
          <input
            type="text"
            placeholder="Enter city name"
            value={weather.city}
            onChange={(e) =>
              setWeather((prev) => ({ ...prev, city: e.target.value }))
            }
          />
          <button type="submit" disabled={weather.loading}>
            {weather.loading ? "Fetching..." : "Get Weather"}
          </button>
        </form>

        {weather.data && (
          <div className="weather_info">
            <h2>{weather.data.city}</h2>
            <p>Temperature: 🌡️{weather.data.temperature}</p>
            <p>Condition: {weather.data.condition}</p>
            <p>Wind Speed: {weather.data.wind_speed} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;

