import { Recipe } from '../types/Recipe';
import { api } from './api';

export const fetchRecipe = async (query: string): Promise<Recipe[]> => {
  try {
    const res = await api.get(`/search.php?s=${query}`);
    return res.data.meals || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};