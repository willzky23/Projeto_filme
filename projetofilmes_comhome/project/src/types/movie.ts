export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  runtime?: number;
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  videos?: {
    results: Video[];
  };
}

export interface SearchFilters {
  query: string;
  genre?: number;
  year?: string;
  rating?: number;
}