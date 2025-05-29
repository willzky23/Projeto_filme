import axios from 'axios';
import { Movie, MovieDetails, Cast, Genre } from '../types/movie';

const API_KEY = 'cf6ec6ffbab96b9197ffb9188ffaa4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

// Get popular movies
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/popular');
    return response.data.results.slice(0, 8);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get now playing movies
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/now_playing', {
      params: { region: 'BR' },
    });
    return response.data.results.slice(0, 8);
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
};

// Get movie details
export const getMovieDetails = async (movieId: string): Promise<MovieDetails | null> => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Get movie cast
export const getMovieCast = async (movieId: string): Promise<Cast[]> => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast.slice(0, 10);
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    return [];
  }
};

// Search movies
export const searchMovies = async (query: string, page = 1): Promise<{ results: Movie[], total_results: number }> => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page },
    });
    return {
      results: response.data.results,
      total_results: response.data.total_results,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_results: 0 };
  }
};

// Get movie genres
export const getMovieGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
};

// Helper function to get full image URL
export const getImageUrl = (path: string | null): string => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}${path}`;
};

export default api;