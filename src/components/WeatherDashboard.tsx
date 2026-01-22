import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useGetWeatherByCityQuery } from "../store/api/weatherApi";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import styles from "./WeatherDashboard.module.css";

const WeatherDashboard: React.FC = () => {
  const { cities: favorites } = useAppSelector((state) => state.favorites);
  const [searchCity, setSearchCity] = useState<string>("Vijayapura");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const {
    data: weather,
    isLoading,
    error,
  } = useGetWeatherByCityQuery(searchCity, {
    skip: !searchCity || searchCity.trim() === "",
    pollingInterval: 60000,
  });

  const handleSearch = (city: string): void => {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      setSearchCity(trimmedCity);
      setShowFavorites(false);
    }
  };

  const weatherData = weather
    ? {
        ...weather,
        clouds: weather.clouds || { all: 0 },
        visibility: weather.visibility || 0,
        sys: {
          ...weather.sys,
          sunrise: weather.sys.sunrise || 0,
          sunset: weather.sys.sunset || 0,
        },
      }
    : null;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>🌤️ Weather Dashboard</h1>
        <button
          className={styles.favoritesToggle}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Hide" : "Show"} Favorites ({favorites.length})
        </button>
      </header>

      <SearchBar onSearch={handleSearch} />

      {isLoading && <div className={styles.loading}>Loading weather...</div>}
      {error && (
        <div className={styles.error}>City not found. Try another city.</div>
      )}

      {weatherData && <WeatherCard weather={weatherData} isLoading={false} />}
    </div>
  );
};

export default WeatherDashboard;
