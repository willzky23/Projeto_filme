import { useParams } from 'react-router-dom';
import MovieInfo from '../components/MovieInfo';
import CastSection from '../components/CastSection';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-textSecondary text-lg">ID do filme não encontrado.</p>
      </div>
    );
  }
  
  return (
    <div className="fade-in">
      <MovieInfo movieId={id} />
      <CastSection movieId={id} />
    </div>
  );
};

export default MovieDetailsPage;