import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import AllOrders from "./allOrders";
import PendingOrders from "./pendingOrders";
import ProcessOrders from "./processOrders";
import DeliveredOrders from "./deliveredOrders";
import OrderApiService from "../../apiServices/orderApiService";
import { Member } from "../../../types/user";
import { Order } from "../../../types/order";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setAllOrders,
  setPendingOrders,
  setProcessOrders,
  setDeliveredOrders,
} from "./slice";
import {
  retrieveAllOrders,
  retrievePendingOrders,
  retrieveProcessOrders,
  retrieveDeliveredOrders,
} from "./selector";
import { useLocation, useNavigate } from "react-router-dom";
import { MakeOrderCont } from "../../context/MakeOrder";
import { WishCont } from "../../context/Wishlist";
import "../../../scss/orders.scss";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setAllOrders: (data: Order[]) => dispatch(setAllOrders(data)),
  setPendingOrders: (data: Order[]) => dispatch(setPendingOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setDeliveredOrders: (data: Order[]) => dispatch(setDeliveredOrders(data)),
});

export function OrdersPage(props: any) {
  /** INITIALIZATIONS **/
  const [value, setValue] = useState("1");
  const pathname = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    setAllOrders,
    setPendingOrders,
    setProcessOrders,
    setDeliveredOrders,
  } = actionDispatch(useDispatch());

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
      .getMyOrders("all")
      .then((data) => setAllOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("pending")
      .then((data) => setPendingOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("delivered")
      .then((data) => setDeliveredOrders(data))
      .catch((err) => console.log(err));
  }, [orderRebuild]);

  const [side, setSide] = WishCont() || [0, () => {}];
  const [orderBtn, setOrderBtn] = MakeOrderCont() || [0, () => {}];

  const topBtn = [
    { id: 0, title: "All Orders" },
    { id: 1, title: "Pending" },
    { id: 2, title: "Process" },
    { id: 3, title: "Delivered" },
  ];
  /**HANDLERS**/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container className="orders_container">
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
        {side === 0 && orderBtn === 2 && <ProcessOrders ld={setOrderRebuild} />}
        {side === 0 && orderBtn === 3 && <DeliveredOrders />}
      </Box>
    </Container>
  );
}
