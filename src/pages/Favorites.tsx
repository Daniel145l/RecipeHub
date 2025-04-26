import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { useFavorites } from '../hooks/useFavorites';

export const Favorites = () => {
  const { favorites, removeFavorites } = useFavorites();

  return (
    <div className='p-4 flex flex-col justify-center gap-4 lg: px-12'>
      <header className='rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6 text-center w-full flex justify-center items-center'>
        <Link to={"/"} className='relative left mr-4'>Voltar</Link>
        <h1 className='text-[#CF1717] text-2xl font-bold'>Receitas Favoritas</h1>
      </header>
      <div className='min-h-96 w-full justify-center flex items-center'>
        { favorites.length === 0 ? (
          <div className='text-center'>
            <p className='font-bold text-[#CF1717] text-2xs mb-2'>Você ainda não tem nenhuma receita favoritada :(</p>
            <p className='text-gray-400'>Você pode favoritar uma receita clicando no botão com um "❤️" na página de detalhes da receita</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 w-full gap-12 px-8 lg:grid-cols-2 lg:px-12'>
            { favorites.map((recipe) => (
              <div key={recipe.idMeal} className='pt-12'>
                <RecipeCard recipe={recipe} onClick={() => {}} />
                <div className='flex justify-between pt-4'>
                  <Link
                    to={`/recipe/${recipe.idMeal}`}
                    className='text-white bg-red-400 p-4 rounded-xl hover:bg-red-500 cursor-pointer'
                  >
                    Ver detalhes
                  </Link>
                  <button
                    onClick={() => removeFavorites(recipe.idMeal)}
                    className='p-4 bg-red-600 rounded-4xl cursor-pointer'
                    title='Desfavoritar'
                  >
                    🤍
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