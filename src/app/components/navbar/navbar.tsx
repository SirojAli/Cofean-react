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
import { ProductCartCont } from "../../context/ProductCart";
import { MakeOrderCont } from "../../context/MakeOrder";

export function Navbar(props: any) {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);
  const [basketOpen, setBasketOpen] = useState<boolean>(false);
  const [addToCart] = ProductCartCont();
  const orders = MakeOrderCont();

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

  const onAdd = (product: any, quantity: number) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? {
              ...exist,
              quantity: exist.quantity + 1,
            }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: quantity,
        name: product.product_name,
        price: product.product_price,
        discount: product.product_discount,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
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
                <NavLink className="menu" to="/cafes">
                  <span>Brands</span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/products">
                  <span>Products</span>
                </NavLink>
              </Box>
              <Box className="menu_page" onClick={props.setPath}>
                <NavLink className="menu" to="/blogs">
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
                  closeHandler();
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
