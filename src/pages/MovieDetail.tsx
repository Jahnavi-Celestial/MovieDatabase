import { Box, Stack, Typography } from "@mui/material";
import {
  addToWatchlist,
  fetchDetail,
  getAccountDetails,
  getAccountStates,
} from "../api/tmdb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

interface Genre {
  id: number;
  name: string;
}

const MovieDetail = () => {
  const { id, type } = useParams();
  const sessionId = localStorage.getItem("tmdb_session_id");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["detail", type, id],
    queryFn: () => fetchDetail(type!, id!),
    enabled: !!id && !!type,
  });

  const { data: accountStates } = useQuery({
    queryKey: ["accountStates", type, id],
    queryFn: () =>
      getAccountStates(type === "tv" ? "tv" : "movie", id!, sessionId!),
    enabled: !!sessionId && !!id && !!type,
  });

  const isInWatchlist = accountStates?.watchlist || false;

  const { mutate: toggleWatchlist } = useMutation(
    {
      mutationFn: async () => {
        if (!sessionId) throw new Error("No Session");
        const account = await getAccountDetails(sessionId);
        return addToWatchlist(
          account.id,
          sessionId,
          type === "tv" ? "tv" : "movie",
          Number(id),
          !isInWatchlist,
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["accountStates", type, id],
        });
        queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      },
      onError: () => {
        alert("Something went wrong. Please try again.");
      },
    },
  );

  const handleWatchlistClick = () => {
    if (!sessionId) {
      alert("Please log in to add to your watchlist!");
      return;
    }
    toggleWatchlist();
  };

  if (isLoading)
    return (
      <Typography sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>
    );

  const bgImage = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        backgroundImage: `linear-gradient(to right, rgba(10, 10, 10, 1) 20%, rgba(10, 10, 10, 0.5) 100%), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        pt: { xs: "80px", md: "0px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: { xs: "20px", md: "40px 80px" },
          gap: "40px",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Box
          component="img"
          src={bgImage}
          alt={data.title}
          sx={{
            width: { xs: "100%", sm: "300px" },
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", fontSize: { xs: "2rem", md: "3rem" } }}
          >
            {data.title || data.name}
            <Box component="span" sx={{ opacity: 0.7, fontWeight: 400, ml: 1 }}>
              (
              {new Date(data.release_date || data.first_air_date).getFullYear()}
              )
            </Box>
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap", gap: "10px" }}
          >
            <Typography>{data.release_date || data.first_air_date}</Typography>
            <Typography>•</Typography>
            <Typography>
              {data.genres?.map((g: Genre) => g.name).join(", ")}
            </Typography>
            <Typography>•</Typography>
            <Typography>
              {data.runtime
                ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                : "N/A"}
            </Typography>
          </Stack>

          <Box sx={{ my: 2 }}>
            <Box
              onClick={handleWatchlistClick}
              sx={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                bgcolor: isInWatchlist ? "#d40242" : "#032541",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid #fff",
                "&:hover": { bgcolor: isInWatchlist ? "#ff0055" : "#01b4e4" },
              }}
            >
              <AddCircleRoundedIcon sx={{ color: "white" }} />
            </Box>
          </Box>

          {data.tagline && (
            <Typography
              sx={{ fontStyle: "italic", opacity: 0.8, fontSize: "1.1rem" }}
            >
              "{data.tagline}"
            </Typography>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, maxWidth: "800px" }}
            >
              {data.overview}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetail;
