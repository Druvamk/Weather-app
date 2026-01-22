import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WeatherData } from "../../types/types";

const API_KEY = "50857ad7a86321f3b56d49d86f0a8dd4";

if (!API_KEY) {
  console.error(
    "🚨 WEATHER API KEY MISSING! Add VITE_WEATHER_API_KEY to .env file",
  );
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  tagTypes: ["Weather"],
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherData, string>({
      query: (city) => {
        const url = `weather?q=${city}&appid=${API_KEY}&units=metric`;
        return url;
      },
      providesTags: ["Weather"],
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
