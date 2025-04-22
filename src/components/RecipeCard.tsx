import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export const RecipeCard = ({ recipe, onClick} : RecipeCardProps) => {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl min-h-80 hover:bg-amber-100 transition-transform duration-300 ease-in bg-white'
    >

    <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-45 rounded-t-xl object-cover mb-8' />
    <h2 className='text-lg font-semibold'>{recipe.strMeal}</h2>
    <p className='text-sm text-gray-500'>{recipe.strCategory}</p>

    </div>
  );
}