import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types/Recipe';
import { api } from '../utils/api';
import { fetchByCategory } from '../utils/fetchByCategory';
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

  useEffect(() => {
    const fetch = async () => {
      if(!selectedCategory || selectedCategory === 'all') return;

      try {
        setLoading(true);
        const data = await fetchByCategory(selectedCategory);
        setRecipes(data);
      } catch {
        toast.error('Erro ao buscar por receitas');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [selectedCategory])

  return (
    <div className='p-4 flex flex-col justify-center gap-4 lg: px-12'>
      <header className='flex items-center justify-between mb-10 p-6 px-2 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-2 w-full md:px-6'>
        <h1 className='text-xl font-bold text-[#CF1717] md:text-2xl'>RecipeHub</h1>
        <input
          type="text"
          placeholder='Digite o nome do prato ou ingrediente'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-3xs text-sm p-1 rounded-md bg-white border-2 border-gray-300 md:w-xs md:p-2 xl:w-xl'
        />

        <div>
          <Link 
            to={"/favorites"}
            title='Ir para receitas favoritas'
            className='text-4xs'
          >
            ❤️
          </Link>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='text-[#cf1717] text-4xs'
        >
          <option value="all">Todas as categorias</option>
          {category.map((cat) => (
            <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
          ))}
        </select>
      </header>

      {loading ? (
        <p className='text-green-700 font-bold'>Carregando receitas</p>
      ) : (
       <div className='w-full mx-auto grid grid-cols-1 px-8 gap-12 text-center lg:grid-cols-2 lg:px-0'>
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