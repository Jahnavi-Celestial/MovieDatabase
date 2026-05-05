import axios from "axios";
import type { Movie } from "../types/movie";


interface TMDBResponse {
  results: Movie[];
  page: number;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getRequestToken = async () => {
  const { data } = await axios.get(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
  return data.request_token;
};

export const validateTokenWithLogin = async (username: string, password: string, requestToken: string) => {
  await axios.post(`${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`, {
    username,
    password,
    request_token: requestToken,
  });
};

export const createSession = async (requestToken: string) => {
  const { data } = await axios.post(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
    request_token: requestToken,
  });
  return data.session_id;
};

export const getAccountDetails = async (sessionId: string) => {
  const { data } = await axios.get(`${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`);
  return data; 
};

export const getWatchlist = async (accountId: number, sessionId: string, type: 'movies' | 'tv') => {
  const endpoint = type === 'movies' ? 'watchlist/movies' : 'watchlist/tv';
  const { data } = await axios.get(
    `${BASE_URL}/account/${accountId}/${endpoint}?api_key=${API_KEY}&session_id=${sessionId}&sort_by=created_at.asc`
  );
  return data.results;
};

export const getAccountStates = async (mediaType: string, id: string, sessionId: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/${mediaType}/${id}/account_states?api_key=${API_KEY}&session_id=${sessionId}`
  );
  return data;
};

export const addToWatchlist = async (
  accountId: number,
  sessionId: string,
  mediaType: string,
  mediaId: number,
  watchlist: boolean = true 
) => {
  const { data } = await axios.post(
    `${BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      media_type: mediaType,
      media_id: mediaId,
      watchlist: watchlist,
    }
  );
  return data;
};

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

export const searchMovies = async (query: string, page: number = 1) => {
  const { data } = await axios.get(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
  return data; 
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

interface MovieFilters {
  sort_by?: 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc';
  'vote_count.gte'?: number;
  with_genres?: string;
  year?: number;
  primary_release_year?: number;
  [key: string]: string | number | boolean | undefined;
}


export const fetchPopularOrTopRatedMovies = async ({pageParam = 1,filters} : {pageParam: number, filters: MovieFilters}) => {
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

