import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { useFavorites } from '../hooks/useFavorites';

export const Favorites = () => {
  const { favorites, removeFavorites } = useFavorites();

  return (
    <div>
      <h1>Receitas Favoritas</h1>
      { favorites.length === 0 ? (
        <p>Você ainda não tem nenhuma receita favoritada</p>
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
  )
}