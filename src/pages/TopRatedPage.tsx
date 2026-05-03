import { useEffect, useState } from "react";
import { Grid, Typography, Container, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import SidebarFilter from "../components/SidebarFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularOrTopRatedMovies } from "../api/tmdb";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: "movie" | "tv" | "person";
}

const TopRatedPage = () => {
  const [filters, setFilters] = useState({
    sort_by: "vote_average.desc",
    with_genres: "",
    "vote_average.gte": 1,
    "vote_average.lte": 10,
    "vote_count.gte": 100,
  });

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["moviesInfRating", filters],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        fetchPopularOrTopRatedMovies({ pageParam, filters }),
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Container maxWidth="xl" sx={{ my: 2, px: { xs: 1, sm: 2 } }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, ml: 1 }}>
        Top Rated Movies
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box
          sx={{ width: { xs: "100%", md: "260px" }, boxSizing: "border-box" }}
        >
          <SidebarFilter
            setFilters={setFilters}
            initialSort="vote_average.desc"
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <Typography sx={{ ml: 2 }}>Loading...</Typography>
            ) : (
              data?.pages.map((page) =>
                page.results.map((movie: Movie) => (
                  <Grid item key={movie.id} xs={6} sm={4} lg={2}>
                    <MovieCard movie={movie} />
                  </Grid>
                )),
              )
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default TopRatedPage;
