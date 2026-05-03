import React, { useState } from 'react';
import { 
  AppBar, 
  Button, 
  Box, 
  InputBase,
  Menu,
  MenuItem
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { NavLink } from 'react-router-dom';

import logo from '../assets/logo.svg'


const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
  
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#032541', flexGrow: 1, flexDirection: {xs: 'column', md: 'row'}, justifyContent: {xs: "start", md: "space-between"}, alignItems: "center", padding: "10px 40px", }}>
        <Box sx={{display: "flex", alignItems: "center", gap: "40px"}}>
            <NavLink to="/">
                <img src={logo} width='200px'/>
            </NavLink>
            <Box sx={{ color: '#fff', textTransform: 'none', fontWeight: 600 }} onMouseEnter={handleOpenMenu}>
                Movie
            </Box>

            <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    slotProps={{list: {onMouseLeave: handleCloseMenu}}}
                    sx={{ 
                        '& .MuiPaper-root': { width: '150px', mt: 1 } 
                    }}
                >
                    <MenuItem onClick={handleCloseMenu}>Popular</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Top Rated</MenuItem>
                </Menu>
        </Box>
        <Box>
            <Button sx={{ color: '#fff', textTransform: 'none', fontWeight: 600 }}>
                Login
            </Button>
            <Button sx={{ color: '#fff', textTransform: 'none', fontWeight: 600 }}>
                <SearchTwoToneIcon onClick={toggleSearch}/>
            </Button>
        </Box>
      </AppBar>
      {
        showSearch && <InputBase
              fullWidth
              placeholder="Search for a movie..."
              sx={{ fontSize: '1.1rem', fontStyle: 'italic', padding: "5px 30px"}}
        />
      }
    </>
  );
};

export default Navbar;