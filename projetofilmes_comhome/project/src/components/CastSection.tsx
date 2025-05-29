import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMovieCast, getImageUrl } from '../services/api';
import { Cast } from '../types/movie';

interface CastSectionProps {
  movieId: string;
}

const CastSection = ({ movieId }: CastSectionProps) => {
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCast();
  }, [movieId]);
  
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 300;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-48 shimmer rounded mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-36">
              <div className="w-full h-48 shimmer rounded-lg"></div>
              <div className="h-5 w-3/4 shimmer rounded mt-2"></div>
              <div className="h-4 w-1/2 shimmer rounded mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (cast.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-textPrimary mb-6">
        Elenco Principal
      </h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 text-textPrimary p-2 rounded-full shadow-md hover:bg-primary/80 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cast.map((person) => (
            <div key={person.id} className="flex-shrink-0 w-36">
              <div className="bg-card rounded-lg overflow-hidden hover:border hover:border-primary transition-all duration-300 h-full">
                <img 
                  src={getImageUrl(person.profile_path)}
                  alt={person.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <h3 className="text-textPrimary font-medium text-sm line-clamp-1">
                    {person.name}
                  </h3>
                  <p className="text-textSecondary text-xs line-clamp-1">
                    {person.character}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 text-textPrimary p-2 rounded-full shadow-md hover:bg-primary/80 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CastSection;