import { Box, Typography, Button, Stack } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import { fetchTrending } from "../api/tmdb";

const TrendingSection = () => {
  const { timeWindow, setTimeWindow } = useMovieContext();

  const { data, isLoading } = useQuery({
    queryKey: ["trending", timeWindow],
    queryFn: () => fetchTrending(timeWindow),
  });

  return (
    <Box sx={{ padding: "20px 0 0 0", borderBottom: "2px solid gray" }}>
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, paddingLeft: {xs: "10px", md: "90px"} }}>
          Trending
        </Typography>

        <Box
          sx={{
            border: "1px solid #032541",
            borderRadius: "30px",
            display: "flex",
            overflow: "hidden",

          }}
        >
          <Button
            onClick={() => setTimeWindow("day")}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              backgroundColor: timeWindow === "day" ? "#032541" : "transparent",
              color: timeWindow === "day" ? "#1ed5a9" : "#032541",
            }}
          >
            Today
          </Button>
          <Button
            onClick={() => setTimeWindow("week")}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              backgroundColor:
                timeWindow === "week" ? "#032541" : "transparent",
              color: timeWindow === "week" ? "#1ed5a9" : "#032541",
            }}
          >
            This Week
          </Button>
        </Box>
      </Stack>

      <Box
        sx={{
          width: "100%",
          minHeight: "300px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 2.5,
          overflowX: "scroll",
          paddingBottom: "20px",
          paddingLeft: { xs: "20px", md: "80px" },
          paddingRight: "40px",
        }}
      >
        {isLoading ? (
          <Typography variant="h4" sx={{textAlign: "center"}}>Loading...</Typography>
        ) : (
          data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default TrendingSection;
