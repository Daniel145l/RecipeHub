import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { useFavorites } from '../hooks/useFavorites';

export const Favorites = () => {
  const { favorites, removeFavorites } = useFavorites();

  return (
    <div className='mx-auto max-w-3/4 p-8 flex flex-col items-center justify-center'>
      <header className='rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6 text-center w-full'>
        <h1 className='text-[#CF1717] text-2xl font-bold'>Receitas Favoritas</h1>
      </header>
      <div className='min-h-96 w-full justify-center flex items-center'>
        { favorites.length === 0 ? (
          <div className='text-center'>
            <p className='font-bold text-[#CF1717] text-2xs mb-2'>Você ainda não tem nenhuma receita favoritada :(</p>
            <p className='text-gray-400'>Você pode favoritar uma receita clicando no botão com um "❤️" na página de detalhes da receita</p>
          </div>
        ) : (
          <div>
            { favorites.map((recipe) => (
              <div key={recipe.idMeal}>
                <RecipeCard recipe={recipe} onClick={() => {}} />
                <div>
                  <Link
                    to={`/recipe/${recipe.idMeal}`}
                  >
                    Ver detalhes
                  </Link>
                  <button
                    onClick={() => removeFavorites(recipe.idMeal)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}