import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../scss/account.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { MakeOrderCont } from "../../context/MakeOrder";

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

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPendingOrders: (data: Order[]) => dispatch(setPendingOrders(data || [])),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data || [])),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data || [])),
  setCancelledOrders: (data: Order[]) =>
    dispatch(setCancelledOrders(data || [])),
  setAllOrders: (data: Order[]) => dispatch(setAllOrders(data || [])),
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

  const [orderBtn, setOrderBtn] = MakeOrderCont();

  const topBtn = [
    { id: 0, title: "All Orders" },
    { id: 1, title: "Pending" },
    { id: 2, title: "Process" },
    { id: 3, title: "Delivered" },
    { id: 4, title: "Cancelled" },
  ];
  const navigate = useNavigate();

  return (
    <Container className="main_wrap">
      <h1>asfdas</h1>
      <Box className="mainbar">
        <Box className="top_btn_wrap">
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
        {orderBtn === 0 && <AllOrders setOrderRebuild={setOrderRebuild} />}
        {orderBtn === 1 && <PendingOrders setOrderRebuild={setOrderRebuild} />}
        {orderBtn === 2 && <ProcessOrders ld={setOrderRebuild} />}
        {orderBtn === 3 && <DeliveredOrders />}
        {orderBtn === 4 && <CancelledOrders />}
      </Box>
    </Container>
  );
};

export default OrderPage;
