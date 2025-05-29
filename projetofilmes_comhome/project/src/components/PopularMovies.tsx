import { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/api';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-textPrimary mb-6">
          Populares da Semana
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularMovies;