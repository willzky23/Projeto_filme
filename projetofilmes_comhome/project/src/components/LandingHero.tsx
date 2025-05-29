import { Link } from 'react-router-dom';
import { Film, Video, Users } from 'lucide-react';

const LandingHero = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4 fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-textPrimary mb-4">
        CinemaScope
      </h1>
      
      <p className="text-textSecondary text-lg md:text-xl max-w-2xl mb-8">
        Sua plataforma definitiva para descobrir filmes, assistir trailers e conhecer mais sobre o mundo do cinema.
      </p>
      
      <Link 
        to="/home" 
        className="bg-primary text-textPrimary px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/80 transition-colors mb-16"
      >
        Explorar Filmes
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="bg-card p-6 rounded-lg">
          <div className="flex justify-center mb-4">
            <Film size={40} className="text-primary" />
          </div>
          <h3 className="text-textPrimary font-semibold text-xl mb-2">Descubra Filmes</h3>
          <p className="text-textSecondary">
            Explore os filmes mais populares e os lançamentos mais recentes.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg">
          <div className="flex justify-center mb-4">
            <Video size={40} className="text-primary" />
          </div>
          <h3 className="text-textPrimary font-semibold text-xl mb-2">Assista Trailers</h3>
          <p className="text-textSecondary">
            Veja trailers dos seus filmes favoritos antes de assisti-los.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg">
          <div className="flex justify-center mb-4">
            <Users size={40} className="text-primary" />
          </div>
          <h3 className="text-textPrimary font-semibold text-xl mb-2">Conheça o Elenco</h3>
          <p className="text-textSecondary">
            Descubra informações sobre atores e personagens dos filmes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;