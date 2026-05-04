import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Paper,
  Avatar,
} from "@mui/material";
import { getAccountDetails, getWatchlist, addToWatchlist } from "../api/tmdb"; 
import type { Movie } from "../types/movie";
import { DeleteOutlined } from "@mui/icons-material";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [mediaType, setMediaType] = useState<"movies" | "tv">("movies");
  const [userData, setUserData] = useState<{
    username: string;
    id: number;
  } | null>(null);

  const sessionId = localStorage.getItem("tmdb_session_id");

  const fetchMyList = async () => {
    if (!sessionId) return;
    try {
      const account = await getAccountDetails(sessionId);
      setUserData({ username: account.username, id: account.id });
      const list = await getWatchlist(account.id, sessionId, mediaType);
      setWatchlist(list);
    } catch (err) {
      console.error("Error loading watchlist data", err);
    }
  };

  useEffect(() => {
    fetchMyList();
  }, [mediaType, sessionId]);

  
  const handleDelete = async (movieId: number) => {
    if (!sessionId || !userData) return;
    try {
      await addToWatchlist(
        userData.id,
        sessionId,
        mediaType === "movies" ? "movie" : "tv",
        movieId,
        false, 
      );

      setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgba(3,37,65,1) 0%, rgba(1,180,228,1) 100%)",
          color: "white",
          py: 6,
          px: 4,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#d40242",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {userData?.username?.charAt(0).toUpperCase() || "U"}
        </Avatar>
        <Typography variant="h4">{userData?.username || "User"}</Typography>
      </Box>

      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          WatchList
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <ToggleButtonGroup
            value={mediaType}
            exclusive
            onChange={(_, val) => val && setMediaType(val)}
            size="small"
          >
            <ToggleButton value="movies" sx={{ borderRadius: "20px", px: 3 }}>
              Movies
            </ToggleButton>
            <ToggleButton value="tv" sx={{ borderRadius: "20px", px: 3 }}>
              TV Shows
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {watchlist.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
            Nothing To Show!
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {watchlist.map((item) => (
              <Paper
                key={item.id}
                elevation={1}
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  borderRadius: 2,
                  border: "1px solid #e3e3e3",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  sx={{ width: 100, height: 150, objectFit: "cover" }}
                />
                <Box sx={{ p: 2, flex: 1, pr: 6 }}>
                  <Typography variant="subtitle1">
                    {item.title || item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.release_date || item.first_air_date}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: "#4d4d4d",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.overview}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    "&:hover": { color: "#d40242" },
                  }}
                  title="Remove from watchlist"
                >
                  <DeleteOutlined />
                </IconButton>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Watchlist;
