import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Footer } from "../footer/footer";

export function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar_box">
          {/* Navbar Logo part */}
          <div className="navbar_left">
            <Box className="navbar_logo">
              <img src="/images/navbar/logo.png" alt="" />
            </Box>
            {/* <Box className="logo_name">COFEAN</Box> */}
          </div>

          {/* Navbar Menu part */}
          <div className="navbar_middle">
            <div className="navbar_menu">
              <Box className="navbar_menu_1">
                <h5>Home</h5>
              </Box>
              <Box className="navbar_menu_1">
                <h5>Brands</h5>
              </Box>
              <Box className="navbar_menu_1">
                <h5>Products</h5>
              </Box>
              <Box className="navbar_menu_1">
                <h5>Blog</h5>
              </Box>
              <Box className="navbar_menu_1">
                <h5>Help</h5>
              </Box>
              <Box className="navbar_menu_1">
                <h5>Orders</h5>
              </Box>
              <Box className="navbar_menu_1">
                <h5>My Page</h5>
              </Box>
            </div>
          </div>

          {/* Navbar Icon part */}
          <div className="navbar_right">
            <div className="navbar_icons">
              <Box className="icon_search">
                <img src="/icons/search.svg" alt="" />
              </Box>
              <Box className="icon_cart">
                <img src="/icons/cart.svg" alt="" />
              </Box>
              <Box className="icon_user">
                <img src="/icons/User.svg" alt="" />
              </Box>
              <Box className="navbar_signup">
                <h5>Signup</h5>
              </Box>
              <Box className="navbar_login">
                <h5>Login</h5>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
