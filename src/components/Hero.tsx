import { Box, Button, InputBase, Typography } from "@mui/material";
import hero from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import {useState} from "react";

const Hero = () => {
  const {setSearchQuery, setShowSearch} = useMovieContext();
  const [localHeroSearch, setLocalHeroSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
      setSearchQuery(localHeroSearch);
      setShowSearch(true)
      navigate(`/serachDetail/${localHeroSearch}`);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter" && localHeroSearch.trim() !== "") {
      handleSearch()
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
        padding: { xs: "20px", md: "0 90px" },
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Typography variant="h3" component="h1">
        Welcome
      </Typography>
      <Typography variant="h5" component="p">
        Millions of movies, TV shows and people to discover. Explore now.
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50px",
          backgroundColor: "white",
          paddingLeft: "20px",
          borderRadius: "50px",
          border: "1px solid",
          marginTop: "30px",
        }}
      >
        <InputBase
          fullWidth
          placeholder="Search for a movie..."
          value={localHeroSearch}
          onChange={(e) => setLocalHeroSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: "50px",
            background: `linear-gradient(to right, rgba(30, 213, 169, 1) 0%, rgba(1, 180, 228, 1) 100%)`,
            padding: "0 30px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
