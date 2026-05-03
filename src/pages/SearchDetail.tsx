import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, CircularProgress, Stack, Paper } from "@mui/material";
import { searchMovies } from "../api/tmdb";

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
  profile_path?: string;
  overview: string
}

const SearchDetail = () => {
  const { input } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["search", input],
    queryFn: () => searchMovies(input || ""),
    enabled: !!input, //when query is not present dont fetch
  });
  const navigate = useNavigate()

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ padding: { xs: "20px", md: "40px 100px" }, mt: "64px" }}>
      

      <Stack spacing={3}>
        {data?.map((item: Movie) => (
          <Paper
            key={item.id} 
            elevation={3}
            sx={{ display: "flex", borderRadius: "8px", overflow: "hidden", height: { xs: "auto", md: "200px" } }}
            onClick={()=>navigate(`/movieDetail/${item.media_type}/${item.id}`)}
          >
            <Box
              component="img"
              src={item.poster_path || item.profile_path 
                ? `https://image.tmdb.org/t/p/w200${item.poster_path || item.profile_path}`
                : ""}
                alt="No image Available"
              sx={{ width: "133px", height: "200px", objectFit: "cover" }}
            />

            <Box sx={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.title || item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                {item.release_date || item.first_air_date || "Date Unknown"}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: "-webkit-box", 
                  WebkitLineClamp: 3, 
                  WebkitBoxOrient: "vertical", 
                  overflow: "hidden",
                  color: "#444" 
                }}
              >
                {item.overview || ""}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default SearchDetail;