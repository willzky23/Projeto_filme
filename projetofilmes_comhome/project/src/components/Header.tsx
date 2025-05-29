import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-card py-4 px-4 md:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link to="/home" className="text-2xl font-bold text-textPrimary mb-4 sm:mb-0">
          CinemaScope
        </Link>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <nav className="space-x-6">
            <Link to="/home" className="text-textSecondary hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-textSecondary hover:text-primary transition-colors">
              Buscar
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Busca rápida..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background text-textPrimary px-4 py-2 pl-10 rounded-md border border-textSecondary focus:border-primary focus:outline-none w-full sm:w-48"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" 
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;