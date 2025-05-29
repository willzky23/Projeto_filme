import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold text-textPrimary mb-6">Buscar Filmes</h1>
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default SearchPage;