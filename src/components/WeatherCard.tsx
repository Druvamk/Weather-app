import React from "react";
import styles from "./WeatherCard.module.css";
import type { WeatherCardProps } from "../types/types";
import { addFavorite, removeFavorite } from "../store/api/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.favorites.cities);
  const isFavorite = data.some((city) => city.id === weather.id);
  console.log(data);
  if (isLoading) {
    return <p>Loading weather details...</p>;
  }
  if (!weather) {
    return <p>No weather data available</p>;
  }

  const { name, main, weather: weatherData, wind, clouds } = weather;
  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);

  return (
    <div className={styles.weatherCard}>
      <div className={styles.gradientBg}></div>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <h1 className={styles.cityName}>{name}</h1>

          <div>
            <button
              className={`${styles.favoriteBtn} ${
                isFavorite ? styles.active : ""
              }`}
              onClick={() => {
                if (isFavorite) {
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
              }}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        </div>

        <div className={styles.mainWeather}>
          <div className={styles.temperature}>
            <span className={styles.tempValue}>{temp}</span>
            <span className={styles.tempUnit}>°C</span>
          </div>
        </div>
        <p className={styles.description}>{weatherData[0].description}</p>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Feels like</span>
            <span className={styles.value}>{feelsLike}°C</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Humidity</span>
            <span className={styles.value}>{main.humidity}%</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Wind</span>
            <span className={styles.value}>{wind.speed.toFixed(1)} m/s</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Pressure</span>
            <span className={styles.value}>{main.pressure} hPa</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Clouds</span>
            <span className={styles.value}>{clouds.all}%</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Visibility</span>
            <span className={styles.value}>
              {(weather.visibility / 1000).toFixed(1)} km
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
