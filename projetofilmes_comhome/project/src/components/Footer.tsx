import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-textPrimary text-lg font-semibold mb-4">CinemaScope</h3>
            <p className="text-textSecondary">
              Sua plataforma para descobrir os melhores filmes.
            </p>
          </div>
          
          <div>
            <h3 className="text-textPrimary text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="text-textSecondary hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-textSecondary hover:text-primary transition-colors">
                  Buscar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-textPrimary text-lg font-semibold mb-4">Sobre</h3>
            <p className="text-textSecondary">
              Este projeto utiliza a API do TMDB (The Movie Database) para fornecer informações sobre filmes.
            </p>
          </div>
        </div>
        
        <div className="border-t border-textSecondary/20 mt-8 pt-6 text-center text-textSecondary">
          <p>&copy; {new Date().getFullYear()} CinemaScope. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;