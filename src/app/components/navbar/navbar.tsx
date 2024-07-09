import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React, { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../footer/footer";
import "../../../scss/navbar.scss";
import { Search, ArrowUpward, Logout } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { verifiedMemberData } from "../../apiServices/verify";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../types/others";
import { ShoppingCartCont } from "../../context/ShoppingCart";
import { MakeOrderCont } from "../../context/MakeOrder";
import Basket from "./basket";

export function Navbar(props: any) {
  /*INITIALIZATIONS*/
  const [path, setPath] = useState();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartJson: any = localStorage.getItem("cart_data");

  useEffect(() => {
    const scrollHandler = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const isScrolled = scrollPosition >= 100;
  const isTopScroll = scrollPosition >= 300;
  const [anchorEl, setAnchorEl] = React.useState(null);

  /*HANDLERS*/
  const topHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clickHandler = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    localStorage.removeItem("member_data");

    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("Logout successful", 700, true);
    } catch (err) {
      console.log(err);
      await sweetFailureProvider("Logout failed");
    }
    navigate("/");
  };

  const {
    cartItems = [],
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setOrderRebuild,
  } = props;
  console.log(cartItems);

  return (
    <>
      <div className={isScrolled ? "navbar active_scroll" : "navbar"}>
        <div className="navbar_box">
          <div className="navbar_left">
            <Box className="navbar_logo">
              <img src="/images/navbar/logo1.png" alt="" />
              <Box>
                <NavLink style={{ textDecoration: "none" }} to="/">
                  <p>COFEAN</p>
                </NavLink>
              </Box>
            </Box>
          </div>

          <div className="navbar_middle">
            <div className="navbar_menu">
              <Box className="menu_page">
                <NavLink className="menu" to="/">
                  <span>Home</span>
                </NavLink>
              </Box>
              <Box className="menu_page">
                <NavLink className="menu" to="/cafes">
                  <span>Brands</span>
                </NavLink>
              </Box>
              <Box className="menu_page">
                <NavLink className="menu" to="/products">
                  <span>Products</span>
                </NavLink>
              </Box>
              <Box className="menu_page">
                <NavLink className="menu" to="/blogs">
                  <span>Blog</span>
                </NavLink>
              </Box>
              <Box className="menu_page">
                <NavLink className="menu" to="/help">
                  <span>Help</span>
                </NavLink>
              </Box>
            </div>
          </div>

          <div className="navbar_right">
            <div className="navbar_icons">
              <Box
                className="icons"
                onClick={() => {
                  closeHandler();
                  navigate("/products");
                }}
              >
                <Search className="icon" />
              </Box>
              <Box className="icons">
                <Basket
                  className="icon"
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  onDeleteAll={onDeleteAll}
                  setOrderRebuild={setOrderRebuild}
                />
              </Box>

              {/* for dropdown menu */}
              {verifiedMemberData && (
                <Box>
                  <Button
                    aria-controls="dropdown-menu"
                    aria-haspopup="true"
                    onClick={clickHandler}
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
                    onClose={closeHandler}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    style={{
                      width: "180px",
                      height: "300px",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        closeHandler();
                        navigate("/profile");
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
                        My Profile
                      </p>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        // closeHandler();
                        navigate("/orders");
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
                        closeHandler();
                        logoutHandler();
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

              {!verifiedMemberData && (
                <Box className="auth_mb">
                  <Box className="navbar_signup">
                    <NavLink className="menu" to="/signup">
                      <span>Signup</span>
                    </NavLink>
                  </Box>
                  <Box className="navbar_login">
                    <NavLink className="menu" to="/login">
                      <span>Login</span>
                    </NavLink>
                  </Box>
                </Box>
              )}
            </div>
          </div>
        </div>
        {isTopScroll && (
          <ArrowUpward
            sx={{ fill: "#ffffff ", width: "40px", height: "40px" }}
            className="up_icon"
            onClick={topHandler}
          />
        )}
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
