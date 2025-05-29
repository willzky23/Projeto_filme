import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Home, Heart } from 'lucide-react';
import { getMovieDetails, getImageUrl } from '../services/api';
import { MovieDetails } from '../types/movie';

interface MovieInfoProps {
  movieId: string;
}

const MovieInfo = ({ movieId }: MovieInfoProps) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [movieId]);
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };
  
  const getTrailerKey = () => {
    if (!movie?.videos?.results) return null;
    
    const trailer = movie.videos.results.find(
      (video) => video.site === 'YouTube' && 
      (video.type === 'Trailer' || video.type === 'Teaser')
    );
    
    return trailer?.key || null;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-6 w-36 shimmer rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="w-full h-96 shimmer rounded"></div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="h-10 w-3/4 shimmer rounded"></div>
            <div className="h-6 w-1/2 shimmer rounded"></div>
            <div className="h-4 w-full shimmer rounded"></div>
            <div className="h-4 w-full shimmer rounded"></div>
            <div className="h-4 w-2/3 shimmer rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-textSecondary text-lg">Filme não encontrado.</p>
      </div>
    );
  }
  
  const trailerKey = getTrailerKey();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6 text-textSecondary">
        <Link to="/home" className="flex items-center hover:text-primary transition-colors">
          <Home size={18} className="mr-1" />
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-textPrimary">Detalhes do Filme</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-textPrimary mb-2">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-4 text-textSecondary">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            
            {movie.runtime > 0 && (
              <span className="flex items-center">
                <Clock size={16} className="mr-1" />
                {formatRuntime(movie.runtime)}
              </span>
            )}
            
            <span className="flex items-center text-primary">
              <Star size={16} className="mr-1" />
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <span 
                key={genre.id}
                className="bg-card text-textPrimary px-3 py-1 rounded-md text-sm border border-textSecondary/20"
              >
                {genre.name}
              </span>
            ))}
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-textPrimary mb-2">Sinopse</h2>
            <p className="text-textPrimary leading-relaxed">
              {movie.overview || 'Sinopse não disponível.'}
            </p>
          </div>
          
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setFavorited(!favorited)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                favorited 
                  ? 'bg-primary text-textPrimary' 
                  : 'bg-transparent border border-textSecondary text-textSecondary hover:border-primary hover:text-primary'
              }`}
            >
              <Heart size={18} className="mr-2" fill={favorited ? '#E0E0E0' : 'none'} />
              {favorited ? 'Favoritado' : 'Favoritar'}
            </button>
            
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: movie.title,
                    text: `Confira ${movie.title} no CinemaScope`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copiado para a área de transferência!');
                }
              }}
              className="bg-transparent border border-textSecondary text-textSecondary px-4 py-2 rounded-md flex items-center hover:border-primary hover:text-primary transition-colors"
            >
              Compartilhar
            </button>
          </div>
          
          {trailerKey && (
            <div>
              <h2 className="text-xl font-semibold text-textPrimary mb-4">Trailer</h2>
              <div className="aspect-video bg-card rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;