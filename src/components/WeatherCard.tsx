import React from "react";
import styles from "./WeatherCard.module.css";
import type { WeatherCardProps } from "../types/types";

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.loadingCard}>
        <div className={styles.spinner}></div>
        <p>Loading weather details...</p>
      </div>
    );
  }
  if (!weather) {
    return (
      <div className={styles.emptyState}>
        <p>No weather data available</p>
      </div>
    );
  }

  const { name, main, weather: weatherData, sys, wind, clouds } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData[0].icon}@1x.png`;
  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  console.log(iconUrl);

  return (
    <div className={styles.weatherCard}>
      <div className={styles.gradientBg}></div>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.location}>
            <h1 className={styles.cityName}>{name}</h1>
            <span className={styles.country}>{sys.country}</span>
          </div>
        </div>

        <div className={styles.mainWeather}>
          <img
            src={iconUrl}
            alt={weatherData[0].description}
            className={styles.weatherIcon}
          />
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
