import { ReactNode, useEffect, useState } from "react";
import { FavoritesContext } from "@/context/FavoritesContext";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  
  return (
    <FavoritesContext value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext>
  );
}
