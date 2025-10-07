import { City } from "@/types/common";
import React, { createContext } from "react";

interface FavoritesContextValue {
  favorites: City[];
  setFavorites: React.Dispatch<React.SetStateAction<City[]>>;
}

export const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  setFavorites: () => {},
});
