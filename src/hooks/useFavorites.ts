import { useCallback, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export function useFavorites() {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const addFavorite = useCallback(
    (cName: string) => {
      cName = cName.toLowerCase();
      if (favorites.length > 4) {
        alert("You can have 4 favorites maximum");
        return;
      }

      const exists = favorites.includes(cName);
      if (!exists) {
        setFavorites([...favorites, cName]);
      }
    },
    [favorites, setFavorites]
  );

  const removeFavorite = useCallback(
    (cName: string) => {
      cName = cName.toLowerCase();
      setFavorites(favorites.filter((city) => cName !== city));
    },
    [setFavorites, favorites]
  );

  return { favorites, addFavorite, removeFavorite };
}
