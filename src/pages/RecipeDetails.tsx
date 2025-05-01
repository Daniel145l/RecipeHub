import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { Recipe } from "../types/Recipe";

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const { addFavorites, removeFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(id ?? "");


  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-content mt10">Carregando</p>
  if (!recipe) return <p className="text-content mt10">Receita não encontrada</p>

  const ingredients = [];

  for(let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
    const measure = recipe[`strMeasure${i}` as keyof Recipe];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-xl mb-6 w-full" />
      <p className="text-lg mb-2"><strong>Categoria:</strong> {recipe.strCategory}</p>
      <p className="text-base mb-4 whitespace-pre-line">{recipe.strInstructions}</p>

      <section className="mt-4">
        <h3>Ingredientes:</h3>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <button
        onClick={() => 
          favorite ? removeFavorites(recipe.idMeal) : addFavorites(recipe)
        }
        className= {!favorite ? "border-2 border-red-600 p-4 rounded-4xl mt-4 cursor-pointer" : "border-2 border-white bg-red-600 mt-4 cursor-pointer rounded-4xl p-4"}
        title={!favorite ? "Favoritar" : "Desfavoritar"}
      >
        {!favorite ? <span className="text-red-500">❤️</span> : <span className="text-red-500">🤍</span>}
      </button>

    </div>
  )
}