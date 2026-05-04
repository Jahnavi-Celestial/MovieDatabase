import React, { useState } from "react";
import { AppBar, Button, Box, InputBase, Menu, MenuItem, Toolbar } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useMovieContext } from "../context/MovieContext";
import { getAccountDetails } from "../api/tmdb"; 
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { searchQuery, setSearchQuery, showSearch, setShowSearch } = useMovieContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("tmdb_session_id");

  const { data: userData } = useQuery({
    queryKey: ["authUser", sessionId],
    queryFn: () => getAccountDetails(sessionId!),
    enabled: !!sessionId,
    retry: false,
  });

  const username: string = userData?.username;

  const toggleSearch = (): void => {
    setShowSearch(!showSearch);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/serachDetail/:${searchQuery}`);
    }
  }

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#032541", zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: "space-between", padding: { xs: "10px 0 0 0", md: "0 40px" }, flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
              <img src={logo} width="154px" height="20px" alt="TMDB Logo" />
            </NavLink>

            <Box
              sx={{ color: "#fff", cursor: "pointer", fontWeight: 600, "&:hover": { color: "rgba(255,255,255,0.7)" } }}
              onMouseEnter={handleOpenMenu}
            >
              Movies
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              slotProps={{ list: { onMouseLeave: handleCloseMenu } }}
            >
              <MenuItem onClick={() => { navigate("/popular"); handleCloseMenu(); }}>Popular</MenuItem>
              <MenuItem onClick={() => { navigate("/topRated"); handleCloseMenu(); }}>Top Rated</MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {username ? (
              <Button 
                sx={{ color: "#fff", textTransform: "none", fontWeight: 600 }} 
                onClick={() => navigate("/watchList")}
              >
                {username}
              </Button>
            ) : (
              <Button 
                sx={{ color: "#fff", textTransform: "none", fontWeight: 600 }} 
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            <Button onClick={toggleSearch} sx={{ color: "white", minWidth: "auto" }}>
              <SearchTwoToneIcon fontSize="medium" />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {showSearch && (
        <Box sx={{ position: "fixed", top: "64px", left: 0, width: "100%", backgroundColor: "white", borderBottom: "1px solid #ddd", zIndex: 1200 }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search for a movie, tv show, person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ padding: "10px 40px", fontSize: "1.1rem", fontStyle: "italic", color: "#333" }}
          />
        </Box>
      )}
    </>
  );
};

export default Navbar;