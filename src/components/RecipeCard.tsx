import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe } : RecipeCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
      className='cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl min-h-80 hover:bg-amber-100 transition-transform duration-300 ease-in bg-white text-center'
      whileHover={{scale: 1.01}}
      whileTap={{opacity: .5}}
      // initial={{opacity: 0, y: 50}}
      // animate={{opacity: 1, y: 0}}
      transition={{duration: 0.1}}
    >

      <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-45 rounded-t-xl object-cover mb-8' />
      <h2 className='text-lg font-semibold'>{recipe.strMeal}</h2>
      <p className='text-sm text-gray-500'>{recipe.strCategory}</p>
    </motion.div>
  );
}