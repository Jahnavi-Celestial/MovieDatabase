import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string,
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: "movie" | "tv" | "person";
  profile_path?: string
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const path: string | undefined = movie.poster_path || movie.profile_path
  const imageUrl = `https://image.tmdb.org/t/p/w500${path}`;
  const mediaType = movie.media_type || "movie";

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minWidth: "150px",
        maxWidth: "150px",
        cursor: "pointer",
        padding: "10px",
        flexShrink: 0,
      }}
      onClick={()=>navigate(`/movieDetail/${mediaType}/${movie.id}`)}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={movie.title || movie.name}
        onError={(e) => e.target.src = "https://via.placeholder.com/150x225.png?text=No+Image"}
        sx={{
          width: "100%",
          height: "225px",
          borderRadius: "8px",
          objectFit: "cover",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.03)" },
        }}
      />

      <Box sx={{ pt: 1, px: 1 }}>
        <Typography sx={{ fontWeight: "bold", lineHeight: "1.2", mb: 0.5 }}>
          {movie.title || movie.name}
        </Typography>
        <Typography sx={{ color: "gray" }}>
          {movie.release_date || movie.first_air_date}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieCard;