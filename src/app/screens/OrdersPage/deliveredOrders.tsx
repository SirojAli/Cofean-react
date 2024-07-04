import { Stack } from "@mui/material";
import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveDeliveredOrders } from "./selector";
import OrderCart from "./orderCart";
import { Order } from "../../../types/order";

// REDUX SELECTOR
const deliveredOrdersRetriever = createSelector(
  retrieveDeliveredOrders,
  (deliveredOrders) => ({
    deliveredOrders,
  })
);
const DeliveredOrders = () => {
  const { deliveredOrders } = useSelector(deliveredOrdersRetriever);
  return (
    <Stack className="orders_wrap">
      {deliveredOrders?.map((order: Order) => {
        return <OrderCart order={order} key={order._id} />;
      })}
    </Stack>
  );
};

export default DeliveredOrders;
