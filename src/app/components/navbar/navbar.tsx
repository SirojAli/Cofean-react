import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../footer/footer";
import "../../../scss/navbar.scss";
import {
  Search,
  ArrowUpward,
  Person,
  Logout,
  FavoriteBorder,
  ListAlt,
  MenuOutlined,
  KeyboardArrowRight,
} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export function Navbar(props: any) {
  /*INITIALIZATIONS*/
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if scrollPosition is greater than or equal to 100
  const isScrolled = scrollPosition >= 100;
  const isTopScroll = scrollPosition >= 300;

  // for dropdown menu:
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={isScrolled ? "navbar active_scroll" : "navbar"}>
        <div className="navbar_box">
          <div className="navbar_left">
            <Box className="navbar_logo">
              <img src="/images/navbar/logo1.png" alt="" />
              <p>COFEAN</p>
            </Box>
          </div>

          <div className="navbar_middle">
            <div className="navbar_menu">
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/">
                  <span>Home</span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/cafe">
                  <span>Brands</span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/products">
                  <span>Products</span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/blog">
                  <span>Blog</span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/help">
                  <span>Help</span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/my-account">
                  <span>Account </span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/members">
                  <span>My Page</span>
                </NavLink>
              </Box>
            </div>
          </div>

          <div className="navbar_right">
            <div className="navbar_icons">
              <Box className="icon_search">
                <Search />
              </Box>
              <Box className="icon_cart" onClick={props.setPath}>
                <ShoppingCartIcon />
              </Box>
              {/* for dropdown menu */}
              <Button
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={<MenuIcon />}
              >
                <Box className="icon_user" onClick={props.setPath}>
                  {/* <AccountBoxIcon /> */}
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                </Box>
              </Button>
              <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleClose}>My Page</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Order</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>

              <Box className="navbar_signup" onClick={props.setPath}>
                <NavLink className="menu" to="/signup">
                  <span>Signup</span>
                </NavLink>
              </Box>
              <Box className="navbar_login" onClick={props.setPath}>
                <NavLink className="menu" to="/login">
                  <span>Login</span>
                </NavLink>
              </Box>
              {/* <Box className="navbar_logout" onClick={props.setPath}>
                <NavLink className="menu" to="/login">
                  <span>Logout</span>
                </NavLink>
              </Box> */}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
