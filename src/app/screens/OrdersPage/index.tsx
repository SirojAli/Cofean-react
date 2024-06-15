import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../scss/orders.scss";
import {
  FavoriteBorder,
  ListAltOutlined,
  PinDropOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { WishCont } from "../../context/Wishlist";
import { MakeOrderCont } from "../../context/MakeOrder";
import Wishlist from "./wishlist";

// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setFinishedOrders,
  setPendingOrders,
  setProcessOrders,
  setCancelledOrders,
  setAllOrders,
} from "./slice";
import { Order } from "../../../types/order";
import AllOrders from "./allOrders";
import PendingOrders from "./pendingOrders";
import ProcessOrders from "./processOrders";
import DeliveredOrders from "./deliveredOrders";
import CancelledOrders from "./CancelledOrders";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPendingOrders: (data: Order[]) => dispatch(setPendingOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  setCancelledOrders: (data: Order[]) => dispatch(setCancelledOrders(data)),
  setAllOrders: (data: Order[]) => dispatch(setAllOrders(data)),
});

const OrderPage = () => {
  /*INSTALIZATIONS*/
  const {
    setPendingOrders,
    setProcessOrders,
    setFinishedOrders,
    setCancelledOrders,
    setAllOrders,
  } = actionDispatch(useDispatch());
  const pathname = useLocation();
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  useEffect(() => {
    const orderService = new OrderApiService();
    orderService
      .getMyOrders("pending")
      .then((data) => setPendingOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("cancelled")
      .then((data) => setCancelledOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("all")
      .then((data) => setAllOrders(data))
      .catch((err) => console.log(err));
  }, [orderRebuild]);
  const [side, setSide] = WishCont();
  const [orderBtn, setOrderBtn] = MakeOrderCont();
  const sideList = [
    { id: 0, icon: <ListAltOutlined />, title: "My Orders" },
    { id: 1, icon: <PinDropOutlined />, title: "My Address" },
    { id: 3, icon: <FavoriteBorder />, title: "Wishlist" },
  ];
  const topBtn = [
    { id: 0, title: "All Orders" },
    { id: 1, title: "Pending" },
    { id: 2, title: "Process" },
    { id: 3, title: "Delivered" },
    { id: 4, title: "Cancelled" },
  ];
  const navigate = useNavigate();
  return (
    <Container className="orders_container">
      <Stack className="main_wrap">
        <Box className="sidebar">
          <h4 className="side_head">Quick Access</h4>
          {sideList.map(({ id, icon, title }) => {
            return (
              <Box
                key={id}
                className={
                  id === side ? "side_btn side_btn_active" : "side_btn"
                }
                onClick={() => setSide(id)}
              >
                {icon}
                <p>{title}</p>
              </Box>
            );
          })}
        </Box>
        <Box className="mainbar">
          <Box
            sx={side === 0 ? { opacity: "1" } : { opacity: "0" }}
            className="top_btn_wrap"
          >
            {topBtn.map(({ id, title }) => {
              return (
                <Button
                  key={id}
                  className={
                    orderBtn === id ? "top_btn top_btn_active" : "top_btn"
                  }
                  onClick={() => setOrderBtn(id)}
                >
                  {title}
                </Button>
              );
            })}
          </Box>
          {side === 0 && orderBtn === 0 && (
            <AllOrders setOrderRebuild={setOrderRebuild} />
          )}
          {side === 0 && orderBtn === 1 && (
            <PendingOrders setOrderRebuild={setOrderRebuild} />
          )}
          {side === 0 && orderBtn === 2 && (
            <ProcessOrders ld={setOrderRebuild} />
          )}
          {side === 0 && orderBtn === 3 && <DeliveredOrders />}
          {side === 0 && orderBtn === 4 && <CancelledOrders />}
          {side === 1 && (
            <Stack className="address_wrap">
              <Box className="address_box">
                <h3>Address</h3>
                {verifiedMemberData?.mb_address &&
                verifiedMemberData?.mb_address !== "" ? (
                  <>
                    <FormControlLabel
                      value="address"
                      control={<Radio checked />}
                      label="South Korea Busan Saha-gu Nakdong-daero 1357, 45"
                    />
                    <Button
                      onClick={() => navigate("/my-account")}
                      className="address_btn"
                    >
                      Change address
                    </Button>
                  </>
                ) : (
                  <>
                    <p>
                      Pleae add your address to deliver your ordered products
                    </p>
                    <Button
                      onClick={() => navigate("/my-account")}
                      className="address_btn"
                    >
                      Add address
                    </Button>
                  </>
                )}
              </Box>
            </Stack>
          )}
          {side === 3 && <Wishlist />}
        </Box>
      </Stack>
    </Container>
  );
};

export default OrderPage;
