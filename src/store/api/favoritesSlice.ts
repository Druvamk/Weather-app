import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoriteCity {
  id: number;
  name: string;
  country: string;
}

interface FavoritesState {
  cities: FavoriteCity[];
}

const loadFavorites = (): FavoriteCity[] => {
  try {
    return JSON.parse(localStorage.getItem("weatherFavorites") || "[]");
  } catch {
    return [];
  }
};

const saveFavorites = (cities: FavoriteCity[]): void => {
  localStorage.setItem("weatherFavorites", JSON.stringify(cities));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { cities: loadFavorites() } as FavoritesState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      if (!state.cities.find((city) => city.id === action.payload.id)) {
        state.cities.unshift(action.payload);
        saveFavorites(state.cities);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      saveFavorites(state.cities);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
