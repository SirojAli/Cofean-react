import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import OrderPage from "../OrdersPage";
import Wishlist from "../OrdersPage/wishlist";
import "../../../scss/account.scss";
import { MySettings } from "./settings";

export function MyProfile() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const location = useLocation();

  const renderChosenPage = () => {
    switch (location.pathname) {
      case "/profile":
        return <MySettings />;
      case "/orders":
        return <OrderPage />;
      case "/wishlist":
        return <Wishlist />;
      default:
        return <MySettings />;
    }
  };
  // HANDLERS

  return (
    <Container className="profile_container">
      <div className="main_wrap">
        <div className="sidebar">
          <h4 className="side_head">Quick Access</h4>
          <Box className="menu" onClick={() => navigate("/profile")}>
            <span>My Profile</span>
          </Box>
          <Box className="menu" onClick={() => navigate("/orders")}>
            <span>Orders</span>
          </Box>
          <Box className="menu" onClick={() => navigate("/wishlist")}>
            <span>Wishlist</span>
          </Box>
        </div>
        <div className="mainbar">{renderChosenPage()}</div>
      </div>
    </Container>
  );
}
