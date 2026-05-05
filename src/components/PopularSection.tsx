import { Box, Typography, Button, Stack } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPopular } from "../api/tmdb";

const PopularSection = () => {
  const { popularType, setPopularType } = useMovieContext();

  const { data, isLoading } = useQuery({
    queryKey: ["popular", popularType],
    queryFn: () => fetchPopular(popularType),
  });

  return (
    <Box sx={{ padding: "20px 0 0 0", borderBottom: "2px solid gray" }}>
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, paddingLeft: {xs: "10px", md: "90px"} }}>
          What's Popular
        </Typography>

        <Box
          sx={{
            border: "1px solid #032541",
            borderRadius: "30px",
            display: "flex",
            overflow: "hidden",
            width: {xs: "90%", md: "auto"}
          }}
        >
          <Button
            onClick={() => setPopularType("movie")}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              backgroundColor: popularType === "movie" ? "#032541" : "transparent",
              color: popularType === "movie" ? "#1ed5a9" : "#032541",
            }}
          >
            Movie
          </Button>
          <Button
            onClick={() => setPopularType("tv")}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              backgroundColor:
                popularType === "tv" ? "#032541" : "transparent",
              color: popularType === "tv" ? "#1ed5a9" : "#032541",
            }}
          >
            On TV
          </Button>

          <Button
            onClick={() => setPopularType("person")}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              backgroundColor:
                popularType === "person" ? "#032541" : "transparent",
              color: popularType === "person" ? "#1ed5a9" : "#032541",
            }}
          >
            People
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
            <MovieCard key={movie.id} movie={movie} type={popularType}/>
          ))
        )}
      </Box>
    </Box>
  );
};

export default PopularSection;
