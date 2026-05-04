import axios from "axios";
import type { Movie } from "../types/movie";


interface TMDBResponse {
  results: Movie[];
  page: number;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async ( timeWindow: "day" | "week",): Promise<TMDBResponse> => {
  const { data } = await axios.get(
    `${BASE_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`,
  );
  return data;
};

export const fetchPopular = async (type: "movie" | "tv" | "person",): Promise<TMDBResponse> => {
  const { data } = await axios.get(
    `${BASE_URL}/${type}/popular?api_key=${API_KEY}`,
  );
  return data;
};

export const searchMovies = async (query: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`,
  );
  return data.results;
};

export const fetchDetail = async (type: string, id: string) => {
  if (!id || !type) throw new Error("Missing params");
  const { data } = await axios.get(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`,
  );
  return data;
};

export const fetchGenres = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  );
  return data.genres;
};


export const fetchPopularOrTopRatedMovies = async ({pageParam = 1,filters} : {pageParam: number, filters: any}) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: 'vote_average.desc',
    'vote_count.gte': 300,    
    ...filters,            
    page: pageParam,               
  });

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

