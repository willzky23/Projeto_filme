import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { getMovieGenres } from '../services/api';
import { Genre } from '../types/movie';

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [genre, setGenre] = useState<string>(searchParams.get('genre') || '');
  const [year, setYear] = useState<string>(searchParams.get('year') || '');
  const [rating, setRating] = useState<string>(searchParams.get('rating') || '');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await getMovieGenres();
      setGenres(genreList);
    };
    
    fetchGenres();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const params = new URLSearchParams();
    
    if (query.trim()) {
      params.append('query', query.trim());
    }
    
    if (genre) {
      params.append('genre', genre);
    }
    
    if (year) {
      params.append('year', year);
    }
    
    if (rating) {
      params.append('rating', rating);
    }
    
    navigate(`/search?${params.toString()}`);
    setTimeout(() => setLoading(false), 300);
  };

  const handleClearFilters = () => {
    setQuery('');
    setGenre('');
    setYear('');
    setRating('');
    navigate('/search');
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let year = currentYear; year >= 2000; year--) {
      years.push(year);
    }
    
    return years;
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar filmes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-background text-textPrimary px-4 py-3 pl-10 rounded-md border border-textSecondary focus:border-primary focus:outline-none"
              />
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" 
              />
            </div>
          </div>
          
          <div>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-background text-textPrimary px-4 py-3 rounded-md border border-textSecondary focus:border-primary focus:outline-none"
            >
              <option value="">Todos os Gêneros</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-background text-textPrimary px-4 py-3 rounded-md border border-textSecondary focus:border-primary focus:outline-none"
            >
              <option value="">Todos os Anos</option>
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full bg-background text-textPrimary px-4 py-3 rounded-md border border-textSecondary focus:border-primary focus:outline-none"
            >
              <option value="">Qualquer Classificação</option>
              <option value="7">7+ Estrelas</option>
              <option value="8">8+ Estrelas</option>
              <option value="9">9+ Estrelas</option>
            </select>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-primary text-textPrimary px-6 py-3 rounded-md font-medium hover:bg-primary/80 transition-colors flex-1"
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            
            <button
              type="button"
              onClick={handleClearFilters}
              className="bg-transparent border border-textSecondary text-textSecondary px-6 py-3 rounded-md font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
            >
              <X size={18} className="mr-2" />
              Limpar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;