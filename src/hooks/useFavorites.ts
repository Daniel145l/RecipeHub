import { useEffect, useState } from 'react';
import { Recipe } from '../types/Recipe';

export function useFavorites() {
  const [ favorites, setFavorites ] = useState<Recipe[]>([]);

  useEffect(() => {
    const storageFavorites = localStorage.getItem('favorites');
    if (storageFavorites) {
      setFavorites(JSON.parse(storageFavorites));
    }
  }, [])

  const addFavorites = (recipe : Recipe ) => {
    const update = [... favorites, recipe];
    setFavorites(update);
    localStorage.setItem('favorites', JSON.stringify(update));
  };

  const removeFavorites = (id : string) => {
    const update = favorites.filter(recipe => recipe.idMeal !== id);
    setFavorites(update);
    localStorage.setItem('favorites', JSON.stringify(update));
  };

  const isFavorite = (id : string) => {
    return favorites.some(recipe => recipe.idMeal === id);
  };

  return {
    favorites,
    addFavorites,
    removeFavorites,
    isFavorite
  }
}