import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types/Recipe';
import { api } from '../utils/api';
import { fetchRecipe } from '../utils/fetchRecipe';

interface Category {
  strCategory: string;
}

export const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState<string>('');

  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async() => {
      try {
        setLoading(true);
        const data = await fetchRecipe(search);
        setRecipes(data);
      } catch {
        toast.error('Erro ao buscar receitas');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/list.php?c=list');
        setCategory(res.data.meals);
      } catch {
        toast.error('Erro ao buscar categorias')
      }
    };

    fetchCategories();
  }, []);



  return (
    <div className='p-12 px-24 mx-auto text-center justify-center gap-4'>
      <div className='flex items-center justify-between mb-10 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
        <h1 className='text-2xl font-bold text-green-700'>RecipeHub</h1>
        <input
          type="text"
          placeholder='Digite o nome do prato ou ingrediente'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-xl px-4 py-2 rounded-md outline-none bg-white border-2 border-gray-300'
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='text-green-700'
        >
          <option value="todas">Todas as categorias</option>
          {category.map((cat) => (
            <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className='text-green-700 font-bold'>Carregando receitas</p>
      ) : (
       <div className='max-w-full mx-auto grid grid-cols-2 gap-12'>
        {recipes.map((recipe) => (
          <div >
            <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={() => alert("Detalhes em breve")} />
            <Link to={`/recipe/${recipe.idMeal}`} className='bg-[#E74C3C] p-2 text-white rounded-sm'>
              Ver detalhes
            </Link>
          </div>
        ))}
       </div>
      )}

    </div>
  );
};