import React, { createContext, ReactNode, useEffect, useState } from "react";

interface FavoritesContextValue {
    favorites: string[];
    setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FavoritesContext = createContext<FavoritesContextValue>({
    favorites: [],
    setFavorites: () => { },
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });
    
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}