// Main weather application component that handles all weather data and UI
import React, { useState, useCallback, useEffect } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import WeatherDetailCard from "./WeatherDetailCard";

const WeatherApp = () => {
  // API key from environment variables
  let API_KEY = process.env.REACT_APP_API_KEY;

  // State variables for weather data
  const [temp, setTemp] = useState(0); // Current temperature
  const [feelsLike, setFeelsLike] = useState(0); // Feels like temperature
  const [humidity, setHumidity] = useState(0); // Humidity percentage
  const [wind, setWind] = useState(0); // Wind speed in km/h
  const [windDeg, setWindDeg] = useState(0); // Wind direction in degrees
  const [city, setCity] = useState("London"); // Current city name
  const [country, setCountry] = useState(""); // Country code
  const [description, setDescription] = useState(""); // Weather description
  const [wicon, setWicon] = useState(cloud_icon); // Weather icon
  const [weatherType, setWeatherType] = useState("cloud"); // Weather type for background
  const [loading, setLoading] = useState(false); // Loading state
  const [pressure, setPressure] = useState(0); // Atmospheric pressure
  const [visibility, setVisibility] = useState(0); // Visibility in km
  const [uvIndex, setUvIndex] = useState(0); // UV index
  const [airQuality, setAirQuality] = useState("Good"); // Air quality (simulated)
  const [sunrise, setSunrise] = useState(""); // Sunrise time
  const [sunset, setSunset] = useState(""); // Sunset time
  const [searchText, setSearchText] = useState(""); // Search input text

  // Maps weather type to CSS background class
  const getWeatherBackground = useCallback((type) => {
    const backgrounds = {
      clear: "clear-sky",
      cloud: "cloudy",
      rain: "rainy",
      drizzle: "drizzly",
      snow: "snowy",
    };
    return backgrounds[type] || "cloudy";
  }, []);

  // Converts wind degrees to compass direction
  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  // Fetches weather data from OpenWeatherMap API
  const searchCity = useCallback(
    async (cityName) => {
      if (cityName === "") return;
      setLoading(true);
      try {
        // Build API URL with city name and API key
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${API_KEY}`;
        let response = await fetch(URL);
        let data = await response.json();

        // Handle city not found error
        if (data.cod === "404") {
          alert("City Not Found!!");
          setLoading(false);
          return;
        }

        // Update all weather state variables from API response
        setTemp(Math.floor(data.main.temp));
        setFeelsLike(Math.floor(data.main.feels_like));
        setHumidity(data.main.humidity);
        setWind(Math.round(data.wind.speed * 10) / 10);
        setWindDeg(data.wind.deg || 0);
        setCity(data.name);
        setCountry(data.sys.country);
        setDescription(data.weather[0].description);
        setPressure(data.main.pressure);
        setVisibility(Math.round((data.visibility / 1000) * 10) / 10);

        // Calculate sunrise/sunset times using timezone offset
        const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000);
        const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000);
        setSunrise(
          sunriseTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        setSunset(
          sunsetTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );

        // Simulate air quality (API doesn't provide this data)
        setAirQuality(Math.random() > 0.5 ? "Good" : "Moderate");

        // Determine weather icon and type based on API icon code
        const iconCode = data.weather[0].icon;
        let newWeatherType = "cloud";

        // Map OpenWeatherMap icon codes to our weather icons and types
        if (iconCode === "01d" || iconCode === "01n") {
          setWicon(clear_icon);
          newWeatherType = "clear";
        } else if (iconCode === "02d" || iconCode === "02n") {
          setWicon(cloud_icon);
          newWeatherType = "cloud";
        } else if (iconCode === "03d" || iconCode === "03n") {
          setWicon(drizzle_icon);
          newWeatherType = "drizzle";
        } else if (iconCode === "04d" || iconCode === "04n") {
          setWicon(drizzle_icon);
          newWeatherType = "drizzle";
        } else if (iconCode === "09d" || iconCode === "09n") {
          setWicon(rain_icon);
          newWeatherType = "rain";
        } else if (iconCode === "10d" || iconCode === "10n") {
          setWicon(rain_icon);
          newWeatherType = "rain";
        } else if (iconCode === "13d" || iconCode === "13n") {
          setWicon(snow_icon);
          newWeatherType = "snow";
        } else {
          setWicon(clear_icon);
          newWeatherType = "clear";
        }

        setWeatherType(newWeatherType);

        // Set UV index based on weather type (simulated values)
        const uvLevels = { clear: 8, cloud: 4, rain: 2, drizzle: 3, snow: 1 };
        setUvIndex(uvLevels[newWeatherType] || 5);

        setLoading(false);
      } catch (error) {
        alert("Error fetching weather data");
        setLoading(false);
      }
    },
    [API_KEY],
  );

  // Load default city weather on component mount
  useEffect(() => {
    searchCity("London");
  }, [searchCity]);

  // Handle search input changes
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // Handle search button click - fetch weather and clear input
  const handleSearch = () => {
    const query = searchText.trim();
    if (!query) return;

    searchCity(query);
    setSearchText("");
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    // Main container with dynamic weather background
    <div className={`weather-container ${getWeatherBackground(weatherType)}`}>
      {/* Search input section */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Start typing city name..."
            value={searchText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src={search_icon} alt="Search" />
          </button>
        </div>
      </div>
      {/* Main weather content area */}
      <div className="weather-main">
        {/* Current weather display section */}
        <div className="current-weather">
          {/* City name and weather description */}
          <div className="location-info">
            <h1 className="city-name">
              {city}, {country}
            </h1>
            <p className="weather-description">{description}</p>
          </div>

          {/* Temperature and weather icon display */}
          <div className="temp-display">
            <div className="weather-icon-large">
              <img src={wicon} alt="weather" />
            </div>
            <div className="temp-info">
              <div className="main-temp">{temp}°</div>
              <div className="feels-like">Feels like {feelsLike}°</div>
            </div>
          </div>
        </div>

        {/* Weather details grid using reusable WeatherDetailCard components */}
        <div className="details-section">
          <WeatherDetailCard
            icon="💧"
            value={`${humidity}%`}
            label="Humidity"
          />

          <WeatherDetailCard
            icon="💨"
            value={`${wind} km/h`}
            label="Wind Speed"
            subLabel={getWindDirection(windDeg)}
          />

          <WeatherDetailCard
            icon="📊"
            value={pressure}
            label="Pressure"
            subLabel="hPa"
          />

          <WeatherDetailCard
            icon="👁️"
            value={visibility}
            label="Visibility"
            subLabel="km"
          />

          <WeatherDetailCard
            icon="☀️"
            value={uvIndex}
            label="UV Index"
            subLabel="Low"
          />

          <WeatherDetailCard
            icon="🌫️"
            value={airQuality}
            label="Air Quality"
            subLabel="Index"
          />

          <WeatherDetailCard icon="🌅" value={sunrise} label="Sunrise" />

          <WeatherDetailCard icon="🌇" value={sunset} label="Sunset" />
        </div>
      </div>

      {/* Loading spinner shown during API calls */}
      {loading && <div className="loading-spinner"></div>}
    </div>
  );
};

export default WeatherApp;
