import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Co2Icon from '@mui/icons-material/Co2';
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { getAuth } from "firebase/auth"; // ** new ** add this for authentication functionality
import { signOut } from "firebase/auth";
import { useState } from "react";

export const NavBar = () => {
  const auth = getAuth();
  const myAuth = localStorage.getItem("auth");

  const navigate = useNavigate();

  let links = [
   
    {
      text: "Track CO2",
      onClick: () => navigate("/Dashboard"),
    },
    {
      text: "About",
      onClick: () => navigate("/About"),
    },
    {
      text: "Sign In",
      onClick: () => navigate("/signin"),
    },
  ];

  let authLinks = [
    
    {
      text: "Track CO2",
      onClick: () => navigate("/Dashboard"),
    },
    {
      text: "About",
      onClick: () => navigate("/About"),
    },
    {
      text: "Sign Out",
      onClick: () => {
        signUsOut();
      },
    },
  ];

  if (myAuth === "true") {
    links = authLinks
  }

  const [navLinks, setNavlinks] = useState(links);

  const signUsOut = async () => {
      await signOut(auth);
      localStorage.setItem("auth", "false");
      localStorage.setItem("token", "");
      setNavlinks(links);
      navigate("/");
      window.location.reload(); 
      
    };



  //copied form MUI template
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Co2Icon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Carbon Galaxy
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: { xs: "block", md: "none" }}}
            >
              {navLinks.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                  <Typography textAlign="right" color='black'>{item.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
         
          <Co2Icon
            fontSize="large"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Carbon Galaxy
          </Typography>
         

          <Box sx={{ position: 'absolute', flexGrow: 1, display: { xs: "none", md: "flex" }, right: '0px' }}>
            {navLinks.map((item, index) => (
              <Button
                key={index}
                onClick={item.onClick}
                sx={{ color: "white", display: "block" }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};