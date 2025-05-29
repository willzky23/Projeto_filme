import PopularMovies from '../components/PopularMovies';
import NowPlaying from '../components/NowPlaying';

const HomePage = () => {
  return (
    <div className="fade-in">
      <PopularMovies />
      <NowPlaying />
    </div>
  );
};

export default HomePage;