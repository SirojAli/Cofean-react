import { Box, Button, Container, IconButton, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Footer } from "../footer/footer";
import "../../../scss/navbar.scss";

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
                  <h5>Home</h5>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/cafe">
                  <h5>Brands</h5>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/products">
                  <h5>Products</h5>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/blog">
                  <h5>Blog</h5>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/help">
                  <h5>Help</h5>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/orders">
                  <h5>Orders</h5>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/members">
                  <h5>My Page</h5>
                </NavLink>
              </Box>
            </div>
          </div>

          <div className="navbar_right">
            <div className="navbar_icons">
              <Box className="icon_search">
                <img src="/icons/search.svg" alt="" />
              </Box>
              <Box className="icon_cart" onClick={props.setPath}>
                <img src="/icons/cart.svg" alt="" />
              </Box>
              <Box className="icon_user" onClick={props.setPath}>
                <img src="/icons/User.svg" alt="" />
              </Box>
              <Box className="navbar_signup" onClick={props.setPath}>
                <NavLink className="menu" to="/signup">
                  <h5>Signup</h5>
                </NavLink>
              </Box>
              <Box className="navbar_login" onClick={props.setPath}>
                <NavLink className="menu" to="/login">
                  <h5>Login</h5>
                </NavLink>
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
