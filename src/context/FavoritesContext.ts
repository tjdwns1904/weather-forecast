import React, { createContext } from "react";

interface FavoritesContextValue {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  setFavorites: () => {},
});
