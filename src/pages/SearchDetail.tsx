import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Paper,
  Pagination,
} from "@mui/material";
import { searchMovies } from "../api/tmdb";
import type { Movie } from "../types/movie";

const SearchDetail = () => {
  const { input } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["search", input, page],
    queryFn: () => searchMovies(input || "", page),
    enabled: !!input,
    placeholderData: (previousData) => previousData,
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <Box sx={{ padding: { xs: "20px", md: "40px 100px" }, mt: "64px" }}>
      <Stack
        spacing={3}
        sx={{
          opacity: isPlaceholderData ? 0.5 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {data?.results?.map((item: Movie) => (
          <Paper
            key={item.id}
            elevation={3}
            sx={{
              display: "flex",
              borderRadius: "8px",
              overflow: "hidden",
              height: { xs: "auto", md: "200px" },
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/movieDetail/${item.media_type}/${item.id}`)
            }
          >
            <Box
              component="img"
              src={
                item.poster_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path || item.profile_path}`
                  : ""
              }
              alt="No image Available"
              sx={{ width: "133px", height: "200px", objectFit: "cover" }}
            />

            <Box
              sx={{
                padding: "20px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.title || item.name}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {formatDate(item.release_date || item.first_air_date || data.birthday || "")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  color: "#444",
                }}
              >
                {item.overview || ""}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
      {data?.results?.length > 0 && data?.total_pages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={data?.total_pages}
            page={page}
            onChange={handleChange}
            color="primary"
            disabled={isPlaceholderData}
          />
        </Box>
      )}
      {data?.results?.length === 0 && !isLoading && (
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          No results found.
        </Typography>
      )}
    </Box>
  );
};

export default SearchDetail;
