import { Recipe } from "../types/Recipe";
import { api } from "./api";

export const fetchByCategory = async (category: string): Promise<Recipe[]> => {
  try {
    const res = await api.get(`/filter.php?c=${category}`);
    return res.data.meals || [];
  } catch(err) {
    console.error("Erro ao buscar por categoria", err);
    return [];
  }
}