import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useGetWeatherByCityQuery } from "../store/api/weatherApi";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import FavoritesList from "./FavoritesList";
import styles from "./WeatherDashboard.module.css";
import { addFavorite, removeFavorite } from "../store/api/favoritesSlice";

const WeatherDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
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

  const handleToggleFavorite = (): void => {
    if (weather) {
      const isFavorited = favorites.some((fav) => fav.id === weather.id);
      if (isFavorited) {
        dispatch(removeFavorite(weather.id));
      } else {
        dispatch(
          addFavorite({
            id: weather.id,
            name: weather.name,
            country: weather.sys.country,
          }),
        );
      }
    }
  };

  const handleRemoveFavorite = (id: number | string): void => {
    dispatch(
      removeFavorite(typeof id === "string" ? parseInt(id as string, 10) : id),
    );
  };

  const handleCitySelect = (cityName: string): void => {
    setSearchCity(cityName);
  };

  const isFavorite = weather
    ? favorites.some((fav) => fav.id === weather.id)
    : false;

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

      {showFavorites && (
        <FavoritesList
          favorites={favorites}
          onCitySelect={handleCitySelect}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}

      {isLoading && <div className={styles.loading}>Loading weather...</div>}
      {error && (
        <div className={styles.error}>City not found. Try another city.</div>
      )}

      {weatherData && (
        <WeatherCard
          weather={weatherData}
          isLoading={false}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
};

export default WeatherDashboard;
