import { useCallback, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { City } from "@/types/common";

export function useFavorites() {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const addFavorite = useCallback(
    (city: City) => {
      let { name } = city;
      name = name.toLowerCase();
      if (favorites.length > 4) {
        alert("You can have 4 favorites maximum");
        return;
      }

      const exists = favorites.some((c) => c.name === name);
      if (!exists) {
        setFavorites([...favorites, {...city, name: city.name.toLowerCase()}]);
      }
    },
    [favorites, setFavorites]
  );

  const removeFavorite = useCallback(
    (cName: string) => {
      cName = cName.toLowerCase();
      setFavorites(favorites.filter((city) => city.name !== cName));
    },
    [setFavorites, favorites]
  );

  return { favorites, addFavorite, removeFavorite };
}
