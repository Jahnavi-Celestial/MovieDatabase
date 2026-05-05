import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: any;
  type?: string;
}

const MovieCard = ({ movie, type }: MovieCardProps) => {
  const navigate = useNavigate();
  
  const path = movie.poster_path || movie.profile_path;
  const imageUrl = path 
    ? `https://image.tmdb.org/t/p/w500${path}` 
    : "https://via.placeholder.com/150x225.png?text=No+Image";

  const mediaType = type || movie.media_type || "movie";

  return (
    <Box
      sx={{
        minWidth: "150px",
        maxWidth: "150px",
        cursor: "pointer",
        padding: "10px",
        flexShrink: 0,
      }}
      onClick={() => navigate(`/movieDetail/${mediaType}/${movie.id}`)}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={movie.title || movie.name}
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
        <Typography sx={{ fontWeight: "bold", lineHeight: "1.2", mb: 0.5, fontSize: "0.9rem" }}>
          {movie.title || movie.name}
        </Typography>
        <Typography sx={{ color: "gray", fontSize: "0.8rem" }}>
          {movie.release_date || movie.first_air_date || (movie.known_for_department)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieCard;
