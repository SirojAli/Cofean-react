import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { PendingOrders } from "./pendingOrders";
import { ProcessOrders } from "./processOrders";
import { DeliveredOrders } from "./deliveredOrders";
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
import "../../../scss/orders.scss";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPendingOrders: (data: Order[]) => dispatch(setPendingOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setDeliveredOrders: (data: Order[]) => dispatch(setDeliveredOrders(data)),
});

export function OrdersPage(props: any) {
  /** INITIALIZATIONS **/
  // const [value, setValue] = useState("1");
  const pathname = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderBtn, setOrderBtn] = useState<number>(1);

  const { setPendingOrders, setProcessOrders, setDeliveredOrders } =
    actionDispatch(useDispatch());

  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
    const orderService = new OrderApiService();
    // Fetch orders based on orderBtn state
    const fetchOrders = async () => {
      try {
        switch (orderBtn) {
          case 1:
            const pendingOrders = await orderService.getMyOrders("pending");
            dispatch(setPendingOrders(pendingOrders));
            break;
          case 2:
            const processOrders = await orderService.getMyOrders("process");
            dispatch(setProcessOrders(processOrders));
            break;
          case 3:
            const deliveredOrders = await orderService.getMyOrders("delivered");
            dispatch(setDeliveredOrders(deliveredOrders));
            break;
          default:
            break;
        }
      } catch (err) {
        console.log("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [orderBtn, dispatch]);

  const topBtn = [
    { id: 1, title: "Pending" },
    { id: 2, title: "Process" },
    { id: 3, title: "Delivered" },
  ];

  const handleBtnClick = (id: number) => {
    setOrderBtn(id);
  };

  const moveToProcess = () => {
    setOrderBtn(2);
  };

  const moveToDeliver = () => {
    setOrderBtn(3);
  };

  return (
    <div className="order_page">
      <Container className="orders_container">
        <Box className="mainbar">
          <Box className="top_btn_wrap">
            {topBtn.map(({ id, title }) => (
              <Button
                key={id}
                className={
                  orderBtn === id ? "top_btn top_btn_active" : "top_btn"
                }
                onClick={() => handleBtnClick(id)}
              >
                {title}
              </Button>
            ))}
          </Box>
          {orderBtn === 1 && (
            <PendingOrders
              setOrderRebuild={setOrderRebuild}
              moveToProcess={moveToProcess}
            />
          )}
          {orderBtn === 2 && (
            <ProcessOrders
              setPendingOrders={setPendingOrders}
              setOrderRebuild={setOrderRebuild}
              moveToDeliver={moveToDeliver}
            />
          )}
          {orderBtn === 3 && <DeliveredOrders />}
        </Box>
      </Container>
    </div>
  );
}
