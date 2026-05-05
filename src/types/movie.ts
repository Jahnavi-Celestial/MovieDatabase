export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string,
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: "movie" | "tv" | "person";
  profile_path?: string;
  overview: string
}
