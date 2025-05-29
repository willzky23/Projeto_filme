import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  showBadge?: boolean;
  badgeText?: string;
}

const MovieCard = ({ movie, showBadge, badgeText }: MovieCardProps) => {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="block group"
    >
      <div className="bg-card rounded-lg overflow-hidden transition-all duration-300 hover:border hover:border-primary h-full flex flex-col">
        <div className="relative">
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          
          {showBadge && badgeText && (
            <div className="absolute top-2 right-2 bg-primary text-textPrimary px-2 py-1 rounded text-xs font-medium">
              {badgeText}
            </div>
          )}
          
          <div className="absolute bottom-2 right-2 bg-card/80 text-primary px-2 py-1 rounded-full text-sm font-medium">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="text-textPrimary font-medium mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-textSecondary text-sm">{releaseYear}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;