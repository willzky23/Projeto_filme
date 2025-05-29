import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { searchMovies } from '../services/api';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setMovies([]);
        setTotalResults(0);
        return;
      }
      
      setLoading(true);
      
      try {
        const data = await searchMovies(query, currentPage);
        setMovies(data.results);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [query, currentPage]);
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    window.scrollTo(0, 0);
  };
  
  if (!query.trim()) {
    return (
      <div className="text-center py-8">
        <p className="text-textSecondary text-lg">
          Digite um termo de busca para encontrar filmes.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {loading ? (
        <div className="mb-4">
          <div className="h-6 w-48 shimmer rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {movies.length > 0 ? (
            <>
              <div className="text-textPrimary mb-6">
                <span className="font-medium">{totalResults}</span> resultados encontrados para: <span className="italic">"{query}"</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? 'bg-card text-textSecondary cursor-not-allowed'
                      : 'bg-primary text-textPrimary hover:bg-primary/80'
                  }`}
                >
                  <ChevronLeft size={18} className="mr-1" />
                  Anterior
                </button>
                
                <span className="bg-card text-textPrimary px-4 py-2 rounded-md">
                  Página {currentPage}
                </span>
                
                <button
                  onClick={handleNextPage}
                  disabled={movies.length === 0}
                  className="bg-primary text-textPrimary px-4 py-2 rounded-md flex items-center hover:bg-primary/80"
                >
                  Próximo
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-textSecondary text-lg">
                Nenhum filme encontrado para "{query}".
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;