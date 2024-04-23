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
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React, { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
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

import { verifiedMemberData } from "../../apiServices/verify";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";

export function Navbar(props: any) {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    // Perform logout actions here, such as clearing authentication data
    // For example, you can clear local storage or session storage
    localStorage.removeItem("member_data");

    try {
      // Make a logout request using MemberApiService
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();

      // Display success alert
      await sweetTopSmallSuccessAlert("Logout successful", 700, true);
    } catch (err) {
      // Log error and display failure alert
      console.log(err);
      await sweetFailureProvider("Logout failed");
    }

    // Navigate to the homepage ("/")
    navigate("/");
  };

  return (
    <>
      <div className={isScrolled ? "navbar active_scroll" : "navbar"}>
        <div className="navbar_box">
          <div className="navbar_left">
            <Box className="navbar_logo">
              <img src="/images/navbar/logo1.png" alt="" />
              <Box onClick={props.setPath}>
                <NavLink style={{ textDecoration: "none" }} to="/">
                  <p>COFEAN</p>
                </NavLink>
              </Box>
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
            </div>
          </div>

          <div className="navbar_right">
            <div className="navbar_icons">
              <Box
                className="icon_search"
                onClick={() => {
                  handleClose();
                  navigate("/products");
                }}
              >
                <Search
                  style={{
                    height: "28px",
                    width: "28px",
                  }}
                />
              </Box>
              <Box className="icon_cart" onClick={props.setPath}>
                <ShoppingCartIcon
                  style={{
                    height: "28px",
                    width: "28px",
                  }}
                />
              </Box>

              {/* for dropdown menu */}
              {verifiedMemberData && (
                <Box>
                  <Button
                    aria-controls="dropdown-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    {verifiedMemberData.mb_image ? (
                      <img
                        src={`${serverApi}/${verifiedMemberData.mb_image}`}
                        alt="Profile"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src="/auth/profile_photo.svg"
                        alt="Default Profile"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Button>
                  <Menu
                    className="dropdown-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    style={{
                      width: "180px",
                      height: "300px",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/members");
                      }}
                      className="drop_menu"
                      sx={{
                        width: "150px",
                        height: "40px",
                      }}
                    >
                      <AccountBoxIcon sx={{ fill: "#444444" }} />
                      <p
                        style={{
                          marginLeft: "8px",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        My Page
                      </p>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/my-account");
                      }}
                      className="drop_menu"
                      sx={{
                        width: "150px",
                        height: "40px",
                      }}
                    >
                      <SettingsIcon sx={{ fill: "#444444" }} />
                      <p
                        style={{
                          marginLeft: "8px",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Settings
                      </p>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/my-account");
                      }}
                      className="drop_menu"
                      sx={{
                        width: "150px",
                        height: "40px",
                      }}
                    >
                      <AssignmentIcon sx={{ fill: "#444444" }} />
                      <p
                        style={{
                          marginLeft: "8px",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        My Orders
                      </p>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleLogout();
                        // navigate("/login");
                      }}
                      className="drop_menu"
                      sx={{
                        width: "150px",
                        height: "40px",
                      }}
                    >
                      <Logout sx={{ fill: "#444444" }} />
                      <p
                        style={{
                          marginLeft: "8px",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Logout
                      </p>
                    </MenuItem>
                  </Menu>
                </Box>
              )}

              {/* Signup and Login buttons for non-members */}
              {!verifiedMemberData && (
                <Box className="auth_mb">
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
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
