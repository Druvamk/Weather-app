import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./api/weatherApi";
import favoritesReducer from "./api/favoritesSlice";
export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
