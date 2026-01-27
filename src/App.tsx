import React, { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useGetWeatherByCityQuery } from "./store/api/weatherApi";
import FavoritesList from "./components/FavoritesList";

const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<string>("Vijayapura");

  const {
    data: weather,
    isLoading,
    error,
    isFetching,
  } = useGetWeatherByCityQuery(currentCity, {
    pollingInterval: 60000,
  });

  const handleSearch = useCallback((city: string): void => {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      setCurrentCity(trimmedCity);
    }
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading weather for {currentCity}...</p>
      </div>
    );
  }

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 0",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "white", fontSize: "2.5rem", margin: 0 }}>
            🌤️ Weather Dashboard
          </h1>
        </header>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="error-state">
            <h3>❌ City not found</h3>
            <p>"{currentCity}" doesn't exist. Try:</p>
            <div className="suggestions">
              <button onClick={() => handleSearch("London")}>London</button>
              <button onClick={() => handleSearch("Delhi")}>Delhi</button>
              <button onClick={() => handleSearch("Mumbai")}>Mumbai</button>
            </div>
          </div>
        )}

        {weather && <WeatherCard weather={weather} isLoading={false} />}
        <FavoritesList />
      </div>
    </div>
  );
};

export default App;
